import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from '@prisma/client';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ReservationEntity implements Reservation {
  @ApiProperty({
    description: '예약등록 아이디',
  })
  @IsInt()
  id: string;

  @ApiProperty({
    description: '예약등록 생성일',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: '예약등록 수정일',
  })
  @IsDate()
  updated: Date;

  @ApiProperty({
    description: '주문번호(아임서버에 호출을 위한 생성주문번호',
  })
  @IsString()
  orderNo: string;

  else01: string;
  else02: string;

  @ApiProperty({
    description: '서비스 API 키',
  })
  @IsString()
  apiKey: string;

  @ApiProperty({
    description: '예약등록 임시번호',
  })
  @IsInt()
  registrationNo: number;

  @ApiProperty({
    description: '예약등록 일렬번호',
  })
  @IsInt()
  reservationBoardingHistoryIdx: number;

  // @ApiProperty({
  //   description: '예약 번호',
  // })
  // @IsInt()
  // reservationNo: number;

  @ApiProperty({
    enum: [0, 1],
    default: 0,
    description: '예약승인여부 (0:승인전, 1:승인)',
  })
  @IsInt()
  reservationApprove: number;

  @ApiProperty({
    description: '예약승일 일시',
  })
  @IsString()
  reservationApproveDate: string;

  @ApiProperty({
    enum: [0, 1],
    default: 0,
    description: '예약취소여부 (0:미취소, 1:취소)',
  })
  @IsInt()
  isCancel: number;
  @ApiProperty({
    description: '예약취소 일시',
  })
  @IsString()
  cancelDate: string;
}
