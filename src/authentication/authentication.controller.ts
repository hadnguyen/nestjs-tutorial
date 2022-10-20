import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService  } from './authentication.service';
import { RegisterDto } from './dto/register.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService : AuthenticationService ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }
}
