import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ReservationCancelDto {
  @ApiProperty({
    description: '예약 ID',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: '취소타입: (1: 수수료 미 부과 취소, 2: 수수료 부과 취소)',
    enum: [1, 2],
  })
  @IsInt()
  cancelType: number; //취소 종류 (1: 수수료 미 부과 취소, 2: 수수료 부과 취소)

  @ApiProperty({
    description: '취소사유 ID - 취소사유조회한 결과에 있는 ID값',
  })
  @IsInt()
  reasonIdx: number;
}
