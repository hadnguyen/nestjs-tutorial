import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from "src/database/postgresErrorCode.enum";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService
    ) { }

    public async register(registrationData: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
                password: hashedPassword
            });
            createdUser.password = undefined;
            return createdUser;
        } catch (error) {
            console.log(error)
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}