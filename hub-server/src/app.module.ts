import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockModule } from './block/block.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: '192.168.50.168',
          port: 13306,
          username: 'root',
          password: configService.get('dbPassword'),
          database: 'hub',
          autoLoadEntities: true,
          synchronize: true,
          charset: 'utf8mb4',
          logging: ['error']
        };
      },
    }),
    BlockModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
