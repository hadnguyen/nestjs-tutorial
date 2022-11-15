import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
  ],    
  providers: [
    AuthenticationService,
    LocalStrategy,
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}