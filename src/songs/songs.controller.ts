import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song-dto';
import { Connection } from '../common/constants/connection';

@Controller({
  path: 'songs',
  scope: Scope.DEFAULT,
})
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(`This is connection string : ${this.connection.CONNECTION_STRING}`);
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    // save the song in the db
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    // fetch all songs from the db
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: e.message,
      });
    }
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
    id: number,
  ) {
    return `Fetch song on the based on id ${id}`;
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
