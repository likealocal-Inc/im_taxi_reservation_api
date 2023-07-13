import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ReservationCancelReasonResponseDto {
  @ApiProperty({
    description: '취소사유 ID',
  })
  @IsInt()
  reasonIdx: number;

  @ApiProperty({
    description: '취소사유',
  })
  @IsString()
  reason: string;

  @ApiProperty({
    enum: [1, 2],
    description: '취소사유 귀책 : 1 = 사용자귀책, 2 = 기사귀책',
  })
  @IsString()
  attributable: string;
}
