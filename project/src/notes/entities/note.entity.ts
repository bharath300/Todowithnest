import { Entity , Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn} from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    // @Column()
    // userid: number;
    @ManyToOne(type => User, user => user.notes)
    @JoinColumn({name:'userId'})
  user: User;

  
}
