import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { SignInReqDto } from './dto/signin.req.dto';
import { SignInResDto } from './dto/signin.res.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singIn(signInReqDto: SignInReqDto): Promise<SignInResDto> {
    this.logger.log(`Signing in user with email: ${signInReqDto.email}`);
    const { email, password } = signInReqDto;
    const user = await this.validatePassword(email, password);
    return {
      token: this.generateAccessToken(user),
    };
  }

  generateAccessToken(user: User): string {
    const { email, _id } = user;
    const payload: JwtPayload = { email, id: _id };
    return this.jwtService.sign(payload);
  }

  async validatePassword(email: string, password: string): Promise<User> {
    this.logger.log(`Validating password for user with email: ${email}`);
    const foundUser = await this.userService.getByEmail(email);
    const passwordMatches = await bcrypt.compare(
      password,
      foundUser.hashedPassword,
    );
    if (!passwordMatches) {
      throw new BadRequestException();
    }
    return foundUser;
  }
}
