import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from '../artists/artist.entity';
// import { connection } from '../common/constants/connection';

/*const mockSongsService = {
  create: () => ['test'],
  findAll: () => [
    {
      id: 1,
      title: 'Beat it',
      artists: ['Michael Jackson'],
    },
  ],
};*/

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [
    SongsService,
    /*{
      provide: 'CONNECTION',
      useValue: connection,
    },*/
    /*{
      provide: SongsService,
      useValue: mockSongsService,
    },*/
    {
      provide: SongsService,
      useClass: SongsService,
    },
  ],
})
export class SongsModule {}
