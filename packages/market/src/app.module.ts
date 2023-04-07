import { Module } from '@nestjs/common';
import { MonitoringModule } from '@app/common/modules/monitoring';
import { CacheProviderModule } from '@app/common/modules/cache/cache-provider.module';
import { PgNotifyClientModule } from '@app/common/pg-transport/pg-notify-client.module';
import { GlobalConfigModule } from '@app/common/modules/config';
import { DatabaseModule } from '@app/common/modules/database/database.module';
import { OffersModule } from './offers/offers.module';
import { SettingsModule } from './settings/settings.module';
import { CollectionsModule } from './collections/collections.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    GlobalConfigModule,
    MonitoringModule,
    CacheProviderModule,
    DatabaseModule.forFeature(),
    PgNotifyClientModule,
    OffersModule,
    CollectionsModule,
    TokensModule,
    SettingsModule,
  ],
})
export class AppModule {}
