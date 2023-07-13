import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReservationCancelReasonDto {
  @ApiProperty({
    description: '예약 ID',
  })
  @IsString()
  reservationId: string;
}
