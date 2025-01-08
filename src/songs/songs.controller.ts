import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create() {
    // save the song in the db
    return this.songsService.create('Animals by Martin Garrix');
  }

  @Get()
  findAll() {
    // fetch all songs from the db
    return this.songsService.findAll();
  }

  @Get(':id')
  findOne(): string {
    return 'Fetch song on the based id';
  }

  @Put(':id')
  update(): string {
    return 'Update song on the based id';
  }

  @Delete(':id')
  delete(): string {
    return 'Delete song on the based id';
  }
}
