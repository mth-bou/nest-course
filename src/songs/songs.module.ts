import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from '../common/constants/connection';

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
  controllers: [SongsController],
  providers: [
    SongsService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
    /*{
      provide: SongsService,
      useValue: mockSongsService,
    },*/
    /*{
      provide: SongsService,
      useClass: SongsService,
    },*/
  ],
})
export class SongsModule {}
