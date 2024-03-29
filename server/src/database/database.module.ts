import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCoreModule } from '@nestjs/typeorm/dist/typeorm-core.module';

@Module({
  providers: [DatabaseService, ConfigService],
  imports: [ConfigModule, TypeOrmCoreModule],
})
export class DatabaseModule {}
