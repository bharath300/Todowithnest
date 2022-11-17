import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UserService } from 'src/user/user.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService,
    private readonly userService: UserService,
    ) {}

  @Post('add')
  async create(@Body() createNoteDto: CreateNoteDto) {
    const ID=await this.userService.findOne(createNoteDto.user);
    return this.notesService.create(createNoteDto, ID );
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get()
  findout() {
    return this.notesService.findAll();
  }

  @Get(':user')
  async findOne(@Param('user') user: string) {
    const user1=await this.userService.findOne(+user);
    return this.notesService.findOne(user1);
  }

  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
