import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { In, Repository } from 'typeorm';
import { Song } from '../songs/song.entity';
import { User } from '../users/user.entity';
import { CreatePlaylistDto } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist) private playlistRepository: Repository<Playlist>,
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(playlistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDto.name;

    const songs = await this.songRepository.findBy({ id: In(playlistDto.songs) });
    playlist.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playlistDto.user });
    playlist.user = user;

    return this.playlistRepository.save(playlist);
  }
}
