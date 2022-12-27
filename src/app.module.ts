import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { SubscribersModule } from './subscribers/subscribers.module';

@Module({
  imports: [PostsModule, ConfigModule.forRoot(), DatabaseModule, AuthenticationModule, UsersModule, AddressModule, SubscribersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
