import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ReservationApprovalDto {
  @ApiProperty({
    description: '예약 ID',
  })
  @IsInt()
  registrationId: string;
}
