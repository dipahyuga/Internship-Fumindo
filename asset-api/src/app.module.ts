import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'asset_fumindo',
        autoLoadEntities: true,
        synchronize: false,
      }),
    AssetModule,
  ],
})
export class AppModule {}
