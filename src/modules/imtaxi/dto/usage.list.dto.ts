import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UsageListDto {
  @ApiProperty({
    description: '예약 ID',
  })
  @IsString()
  id: string;
}
