import { Song } from '../songs/song.entity';

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Each playlist will have multiple songs
  @OneToMany(() => Song, (song) => song.playlist)
  songs: Song[];

  // Each playlist will belong to a unique user
  @ManyToOne(() => User, (user) => user.playlists)
  user: User;
}
