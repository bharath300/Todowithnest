import {Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DBException from 'src/exceptions/db.exception';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private userRepo: Repository <User>, private readonly jwtService:JwtService){

  }
  async create(createUserDto: CreateUserDto) {
    const salt=await bcrypt.genSalt()
    const hashedpwd=await bcrypt.hash(createUserDto.password,salt)
    const user=this.userRepo.create({UserName:createUserDto.UserName, password:hashedpwd});

    return await this.userRepo.save(user).catch(() => {
      throw new DBException();
    });
  }
  
  async findAll() {
    return await this.userRepo.find().catch(() => {
      throw new DBException();
    });
  }

  async findusername(username:any){
    return await this.userRepo.findOne({where: { UserName: username}})
  }

  findOne(itemid: number) {
    return this.userRepo.findOne({ where: { id: itemid } , relations: ['notes']}).catch(() => {
      throw new DBException();
    });;
  }

 async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id,updateUserDto).catch(() => {
      throw new DBException();
    });
    
  }

  async remove(id: number) {
    return await this.userRepo.delete({id}).catch(() => {
      throw new DBException();
    });;
  }
}
