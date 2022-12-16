import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards, Res, UnauthorizedException, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  
  constructor(private readonly userService: UserService, private readonly authService:AuthService,private readonly jwtService: JwtService) {}

  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @Post('check')
  async findUser(@Body() createUserDto: CreateUserDto, @Res({ passthrough: true }) response: Response)
   {
    const Auth_token= await this.authService.Validateuser(createUserDto.UserName, createUserDto.password);
    response.cookie('Auth_token', Auth_token, { httpOnly: false });
    return { message: 'success' };

  }

  @UseGuards(JwtAuthGuard)
  @Get('session')
  async getUser(
    @Req() request: Request,
  ) {
    try {
      const cookie = request.cookies['Auth_token'];
      const userData = await this.jwtService.verifyAsync(cookie);

      if (!userData) {
    
        throw new UnauthorizedException();
      }
      const userDBData = await this.userService.findOne(userData['id']);
      const { password, ...result } = userDBData;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Auth_token');
    return {
      message: 'logged-out',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
