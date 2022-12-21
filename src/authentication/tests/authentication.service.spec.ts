import { AuthenticationService } from '../authentication.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import User from '../../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import mockedConfigService from '../../utils/mocks/config.service';
import mockedJwtService from '../../utils/mocks/jwt.service';
 
describe('The AuthenticationService', () => {
    let authenticationService: AuthenticationService;
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        providers: [
          UsersService,
          AuthenticationService,
          {
            provide: ConfigService,
            useValue: mockedConfigService,
          },
          {
            provide: JwtService,
            useValue: mockedJwtService,
          },
          {
            provide: getRepositoryToken(User),
            useValue: {},
          },
        ],
      }).compile();
      authenticationService = await module.get(AuthenticationService);
    });
    describe('when creating a cookie', () => {
      it('should return a string', () => {
        const userId = 1;
        expect(
          typeof authenticationService.getCookieWithJwtToken(userId),
        ).toEqual('string');
      });
    });
  });