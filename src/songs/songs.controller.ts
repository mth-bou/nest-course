import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
  @Get()
  findAll(): string {
    return 'Find all songs';
  }

  @Get(':id')
  findOne(): string {
    return 'Fetch song on the based id';
  }

  @Post()
  create(): string {
    return 'Create a new song';
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
