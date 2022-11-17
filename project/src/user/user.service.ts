import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
    private userRepo: Repository <User>,){

  }
  async create(createUserDto: CreateUserDto) {
    const user=this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }
  
  findAll() {
    return this.userRepo.find();
  }

  async finduser(createUserDto: CreateUserDto) {
    const note = await this.userRepo.findOne({ where: { UserName: createUserDto.UserName, password:createUserDto.password }});
    if(!note){
      return false;
    }
    return note.id;
  }


  findOne(itemid: number) {
    return this.userRepo.findOne({ where: { id: itemid } , relations: ['notes']});
    // return `This action returns a #${id} user`;
  }

 async update(id: number, updateUserDto: UpdateUserDto) {

    return await this.userRepo.update(id,updateUserDto)
    
  }

  remove(id: number) {
    return this.userRepo.delete({id});
  }
}
