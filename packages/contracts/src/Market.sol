// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@unique-nft/solidity-interfaces/contracts/CollectionHelpers.sol";
import "./utils.sol";

contract Market {
    using ERC165Checker for address;

    struct Order {
      uint32 id;
      uint32 collectionId;
      uint32 tokenId;
      uint32 amount;
      uint256 price;
      address payable seller;
    }

    uint32 public constant version = 1;
    bytes4 private constant InterfaceId_ERC721 = 0x80ac58cd;
    bytes4 private constant InterfaceId_ERC165 = 0x5755c3f2;
    CollectionHelpers private constant collectionHelpers =
        CollectionHelpers(0x6C4E9fE1AE37a41E93CEE429e8E1881aBdcbb54F);
    Utils private utils = new Utils();

    mapping(uint32 => mapping(uint32 => Order)) orders;
    uint32 private idCount = 1;
    uint32 public marketFee;
    address selfAddress;
    address ownerAddress;
    bool marketPause;

    event TokenIsUpForSale(uint32 version, Order item);
    event TokenRevoke(uint32 version, Order item, uint32 amount);
    event TokenIsApproved(uint32 version, Order item);
    event TokenIsPurchased(uint32 version, Order item, uint32 salesAmount);
    event Log(string message);

    error InvalidArgument(string info);
    error InvalidMarketFee();
    error SellerIsNotOwner();
    error TokenIsAlreadyOnSale();
    error TokenIsNotApproved();
    error CollectionNotFound();
    error CollectionNotSupportedERC721();
    error OrderNotFound();
    error TooManyAmountRequested();
    error NotEnoughMoneyError();
    error FailTransferToken(string reason);

    modifier onlyOwner() {
      require(msg.sender == ownerAddress, "Only owner can");
      _;
    }

    modifier onlyNonPause() {
      require(!marketPause, "Market on hold");
      _;
    }

    constructor(uint32 fee) {
        marketFee = fee;
        if (marketFee == 0 || marketFee >= 100) {
            revert InvalidMarketFee();
        }

        ownerAddress = msg.sender;
        selfAddress = address(this);
    }

    function getErc721(uint32 collectionId) private view returns (IERC721) {
        address collectionAddress = collectionHelpers.collectionAddress(
            collectionId
        );

        uint size;
        assembly {
            size := extcodesize(collectionAddress)
        }

        if (size == 0) {
            revert CollectionNotFound();
        }

        if (!collectionAddress.supportsInterface(InterfaceId_ERC721)) {
            revert CollectionNotSupportedERC721();
        }

        return IERC721(collectionAddress);
    }

    function onlyTokenOwner(
        IERC721 erc721,
        uint32 tokenId,
        address seller
    ) private view {
        address realOwner = erc721.ownerOf(tokenId);

        if (realOwner != seller) {
            revert SellerIsNotOwner();
        }
    }

    function isApproved(IERC721 erc721, Order memory item) private {
        // todo not implementable in chain
        try erc721.getApproved(item.tokenId) returns (address approved) {
            emit Log(
                string.concat(
                    "getApproved approved: ",
                    utils.toString(approved)
                )
            );
            if (approved != selfAddress) {
                revert TokenIsNotApproved();
            }
        } catch Error(string memory reason) {
            emit Log(string.concat("getApproved error: ", reason));
        } catch {
            emit Log(string.concat("getApproved error without reason"));
        }
    }

    // ################################################################
    // Set new contract owner                                         #
    // ################################################################

    function setOwner() public onlyOwner {
        ownerAddress = msg.sender;
    }

    // ################################################################
    // Set market pause                                               #
    // ################################################################

    function setPause(bool pause) public onlyOwner {
        marketPause = pause;
    }

    // ################################################################
    // Place a token for sale                                         #
    // ################################################################

    function put(
        uint32 collectionId,
        uint32 tokenId,
        uint256 price,
        uint32 amount
    ) public onlyNonPause {
        if (price == 0) {
          revert InvalidArgument("price must not be zero");
        }
        if (amount == 0) {
          revert InvalidArgument("amount must not be zero");
        }
        if (orders[collectionId][tokenId].price > 0) {
            revert TokenIsAlreadyOnSale();
        }

        IERC721 erc721 = getErc721(collectionId);

        onlyTokenOwner(erc721, tokenId, msg.sender);

        Order memory order = Order(
            0,
            collectionId,
            tokenId,
            amount,
            price,
            payable(msg.sender)
        );

        isApproved(erc721, order);

        order.id = idCount++;
        orders[collectionId][tokenId] = order;

        emit TokenIsUpForSale(version, order);
    }

    // ################################################################
    // Get order                                                      #
    // ################################################################

    function getOrder(
        uint32 collectionId,
        uint32 tokenId
    ) external view returns (Order memory) {
        if (orders[collectionId][tokenId].price == 0) {
            revert OrderNotFound();
        }

        return orders[collectionId][tokenId];
    }

    // ################################################################
    // Revoke the token from the sale                                 #
    // ################################################################

    function revoke(
        uint32 collectionId,
        uint32 tokenId,
        uint32 amount
    ) external {
        if (amount == 0) {
          revert InvalidArgument("amount must not be zero");
        }

        IERC721 erc721 = getErc721(collectionId);
        onlyTokenOwner(erc721, tokenId, msg.sender);

        Order memory order = orders[collectionId][tokenId];

        if (order.price == 0) {
            revert OrderNotFound();
        }

        if (amount > order.amount) {
            revert TooManyAmountRequested();
        }

        order.amount -= amount;
        if (order.amount == 0) {
            delete orders[collectionId][tokenId];
        } else {
            orders[collectionId][tokenId] = order;
        }

        emit TokenRevoke(version, order, amount);
    }

    // ################################################################
    // Check approved                                                 #
    // ################################################################

    function checkApproved(uint32 collectionId, uint32 tokenId) public {
        Order memory order = orders[collectionId][tokenId];
        if (order.price == 0) {
            revert OrderNotFound();
        }

        IERC721 erc721 = getErc721(collectionId);

        onlyTokenOwner(erc721, tokenId, order.seller);

        isApproved(erc721, order);

        emit TokenIsApproved(version, order);
    }

    // ################################################################
    // Buy a token                                                    #
    // ################################################################

    function buy(
        uint32 collectionId,
        uint32 tokenId,
        uint32 amount
    ) public payable onlyNonPause {
        if (msg.value == 0) {
          revert InvalidArgument("msg.value must not be zero");
        }
        if (amount == 0) {
          revert InvalidArgument("amount must not be zero");
        }

        Order memory order = orders[collectionId][tokenId];
        if (order.price == 0) {
            revert OrderNotFound();
        }

        if (amount > order.amount) {
            revert TooManyAmountRequested();
        }

        uint256 totalValue = order.price * amount;
        uint256 feeValue = (totalValue * marketFee) / 100;

        if (msg.value < totalValue) {
            revert NotEnoughMoneyError();
        }

        IERC721 erc721 = getErc721(order.collectionId);
        isApproved(erc721, order);

        order.amount -= amount;
        if (order.amount == 0) {
            delete orders[collectionId][tokenId];
        } else {
            orders[collectionId][tokenId] = order;
        }

        try
            erc721.transferFrom(order.seller, msg.sender, order.tokenId)
        {} catch Error(string memory reason) {
            revert FailTransferToken(reason);
        } catch {
            revert FailTransferToken("without reason");
        }

        order.seller.transfer(totalValue - feeValue);
        if (msg.value > totalValue) {
            payable(msg.sender).transfer(msg.value - totalValue);
        }

        emit TokenIsPurchased(version, order, amount);
    }

    function withdraw(address transferTo) public onlyOwner {
        uint256 balance = selfAddress.balance;

        if (balance > 0) {
            payable(transferTo).transfer(balance);
        }
    }
}
