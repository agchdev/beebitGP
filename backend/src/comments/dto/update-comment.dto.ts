import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ example: 1, description: 'ID del proyecto' })
  @IsOptional()
  @IsString()
  content?: string;
}