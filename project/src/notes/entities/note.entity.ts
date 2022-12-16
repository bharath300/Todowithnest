import { Entity , Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn} from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @ManyToOne(()=> User, user => user.notes, {onDelete: "CASCADE"})
    @JoinColumn({name:'userId'})
    user: User;

  
}
