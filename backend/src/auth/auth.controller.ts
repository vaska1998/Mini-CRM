import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInReqDto } from './dto/signin.req.dto';
import { SignInResDto } from './dto/signin.res.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'SignIn user with valid credentials',
  })
  @ApiCreatedResponse({
    description: 'SingIn successfully',
  })
  async singIn(@Body() signInReqDto: SignInReqDto): Promise<SignInResDto> {
    this.logger.log(`Signing in user with email: ${signInReqDto.email}`);
    return this.authService.singIn(signInReqDto);
  }
}
