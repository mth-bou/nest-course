import { Injectable, Scope } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Artist } from '../artists/artist.entity';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.artists = songDto.artists;
    song.releasedDate = songDto.releasedDate;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;

    console.log(songDto.artists);

    // find all artists based on their id
    const artists = await this.artistRepository.findBy({ id: In(songDto.artists) });
    console.log(artists);
    song.artists = artists;

    return this.songRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    // throw new Error('Error in DB while fetching records');
    return this.songRepository.find();
  }
}
