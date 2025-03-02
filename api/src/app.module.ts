import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MaterialsModule } from './materials/materials.module';
import { User } from './users/entities/user.entity';
import { Material } from './materials/entities/material.entity';

@Module({
  imports: [
    UsersModule,
    MaterialsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        entities: [User, Material],
        namingStrategy: new SnakeNamingStrategy(),
        host: configService.get<string>('DATABASE_HOST') || 'localhost',
        database: configService.get<string>('DATABASE_NAME') || 'postgres',
        password: configService.get<string>('DATABASE_PASS') || 'password',
        username: configService.get<string>('DATABASE_USER') || 'postgres',
        synchronize: true, // DO NOT USE IN PRODUCTION
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
