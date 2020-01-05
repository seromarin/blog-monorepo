import { Controller, UseGuards, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return 'Loggiando'
    // return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Request() req,
    @Body() createuserDTO: CreateUserDTO
  ) {
    return 'Va la madre'
    // return this.authService.register(req.user);
  }
}
