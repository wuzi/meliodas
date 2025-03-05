import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Material } from './materials/entities/material.entity';
import { MaterialsModule } from './materials/materials.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { MaterialImage } from './materials/entities/material-image.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    UsersModule,
    MaterialsModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        entities: [User, Material, MaterialImage],
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
