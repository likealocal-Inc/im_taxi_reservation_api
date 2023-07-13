import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ReservationfareInfo {
  @ApiProperty({
    description: '예약운행요금',
  })
  @IsInt()
  reservationFare: number; // 예약운행요금
  @ApiProperty({
    enum: [0, 1, 2, 3],
    description:
      '추가요금 종류: 0:없음, 1:심야 할증, 2:시외 할증, 3:심야/시외 할증',
  })
  @IsInt()
  surchargeType: 0 | 1 | 2 | 3; //  추가요금 종류: 0:없음, 1:심야 할증, 2:시외 할증, 3:심야/시외 할증

  @ApiProperty({
    description: '톨비용',
  })
  @IsInt()
  toll: number; // 톨 비용 - 호출 시 전달필요
}
