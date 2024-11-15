import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_STATUS, CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthStatus } from 'src/constant/auth.constant';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createAuthDto: CreateAuthDto) {
    const authUser = await this.authService.create(createAuthDto);
    return {
      id: authUser.id,
      username: authUser.username,
      email: authUser.email,
    };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const authUser = await this.authService.findOneByEmail(email);
    if (!authUser) {
      throw new BadRequestException('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, authUser.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }
    if (authUser.status === AuthStatus.Inactive) {
      throw new BadRequestException('Account is inactive');
    }
    // generate token
    const token = await this.jwtService.signAsync({ id: authUser.id });
    return {
      nickname: authUser.username,
      token,
    };
  }

  @Post('logout')
  async logout() {
    return await this.jwtService.signAsync({ id: null });
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
