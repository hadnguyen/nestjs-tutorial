import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './authentication.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
  ],    
  providers: [
    AuthenticationService,
  ],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}