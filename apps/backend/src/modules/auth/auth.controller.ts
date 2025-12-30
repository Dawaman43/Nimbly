import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { User } from '@nimbly/shared-types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: User) {
    return this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials.email, credentials.password);
  }
}
