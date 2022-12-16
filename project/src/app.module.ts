import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv'

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User,Note],
      synchronize: true,
    }),
    UserModule,
    NotesModule,
    AuthModule,
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
