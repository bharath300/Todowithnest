import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async Validateuser(username: string, password: string | Buffer) {
    const user=await this.userService.findusername(username)
    if(!user){
      throw new BadRequestException('User doesnt exist');
    }
    
    if(!await bcrypt.compare(password,user.password))
  {
    throw new BadRequestException('Invalid Credentials');
}
   
      const access_token=await this.jwtService.signAsync({
        name: user.UserName,
        id:user.id
       
      })
      return access_token;
    
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
