import { Injectable, Scope } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song-dto';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Artist } from '../artists/artist.entity';
import { UpdateSongDto } from './dto/update-song-dto';

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

    /*const artistNames = songDto.artists;
    song.artists = await Promise.all(
      artistNames.map(async (name) => {
        let artist = await this.artistRepository.findOneBy({ name });
        if (!artist) {
          artist = this.artistRepository.create({ name });
          await this.artistRepository.save(artist);
        }
        return artist;
      }),
    );*/
    // find all artists based on their id
    song.artists = await this.artistRepository.findByIds(songDto.artists);

    return this.songRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    // throw new Error('Error in DB while fetching records');
    return this.songRepository.find();
  }

  findOne(id: number): Promise<Song | null> {
    return this.songRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songRepository.update(id, recordToUpdate);
  }
}
