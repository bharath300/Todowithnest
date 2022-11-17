import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Note,User])],
  controllers: [NotesController],
  providers: [NotesService,UserService]
})
export class NotesModule {}
