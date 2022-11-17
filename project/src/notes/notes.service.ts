import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private NoteRepo: Repository<Note>,
  ) {}
  async create(createNoteDto: CreateNoteDto, ID: User) {
    const note = this.NoteRepo.create({ name: createNoteDto.name, user: ID });
    return await this.NoteRepo.save(note);
  }



  findAll() {
    return this.NoteRepo.find();
  }

  async findOne(user: User) {
    return this.NoteRepo.find({ where: { user: user } });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    return await this.NoteRepo.update({ id: id }, { name: updateNoteDto.name });
  }

  remove(id: number) {
    return this.NoteRepo.delete({ id });
  }
}
