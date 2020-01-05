import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { NewUser } from 'src/users/interfaces/newUser.interface';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOneUserByUsername(username);
    const user = await this.usersService.findUserByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(newUser: CreateUserDTO) {
    const payload = {
      name: newUser.name,
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      register_date: newUser.register_date,
    };
    try {
      const newUserModel = await this.usersService.addNewUser(payload)
    } catch (error) {
      console.error('Puto error', error)
    }
    return {
      // access_token: this.jwtService.sign(payload),
    };
  }
}
