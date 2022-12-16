import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DBException from 'src/exceptions/db.exception';
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
    const note = await this.NoteRepo.create({
      name: createNoteDto.name,
      user: ID,
    })
    return await this.NoteRepo.save(note).catch(() => {
      throw new DBException();
    });
  }

  async findAll() {
    return await this.NoteRepo.find().catch(() => {
      throw new DBException();
    });
  }

  async findOne(user: User) {
    return await this.NoteRepo.find({ where: { user: user } }).catch(() => {
      throw new DBException();
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    return await this.NoteRepo.update({ id: id }, { name: updateNoteDto.name }).catch((error) => {
      throw new NotFoundException(error.message);
    });
  }

  async remove(id: number) {
    return await this.NoteRepo.delete({ id }).catch(() => {
      throw new DBException();
    });
  }
}
