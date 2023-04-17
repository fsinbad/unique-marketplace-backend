import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sdk } from '@unique-nft/sdk/full';
import { Config } from '../config';
import { KeyringProvider } from '@unique-nft/accounts/keyring';

export const sdkProvider: Provider = {
  provide: Sdk,
  useFactory: async (configService: ConfigService<Config>): Promise<Sdk> => {
    const seed = configService.get('signer')?.seed;

    let signer = null;

    if (seed) {
      const provider = new KeyringProvider({
        type: 'sr25519',
      });
      await provider.init();
      signer = provider.addSeed(configService.get('signer').seed);
    }

    return new Sdk({
      signer,
      baseUrl: configService.get('uniqueSdkRestUrl'),
    });
  },
  inject: [ConfigService],
};
