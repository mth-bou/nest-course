import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artists;

  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: string;

  @IsString()
  @IsOptional()
  readonly lyrics?: string;
}
