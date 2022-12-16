
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Note } from 'src/notes/entities/note.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  UserName: string;

  @Column()
  password: string;

  @OneToMany(() => Note, note => note.user)
  @JoinColumn({name: 'notes'})
  notes: Note[];

}
