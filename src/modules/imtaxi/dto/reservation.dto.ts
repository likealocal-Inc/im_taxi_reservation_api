import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ReservationDto {
  @ApiProperty({
    enum: [1, 3],
    description: '차량종류 (1:화이트, 3:블랙)',
  })
  @IsInt()
  carType: number; //차량 종류 (1:화이트, 3:블랙)

  @ApiProperty({
    enum: [2, 4],
    description:
      '예약종류(2:대절, 4:편도) 4번 편도 선택시 대절시간은 입력안함 ',
  })
  @IsInt()
  reservationType: number; //예약 유형 (2:대절, 4:편도)

  @ApiProperty({
    required: false,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    description: '대절시간(1~10) - reservationType 2번(대절)선택시 입력',
  })
  @IsInt()
  rentalHour?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // 대절시간 1~10

  @ApiProperty({
    description: '예상금액',
  })
  @IsInt()
  estimatedAmount: number; //예상 금액

  @ApiProperty({
    description: '예상 통행 요금(원)',
  })
  @IsInt()
  estimatedToll: number; // 예상 통행 요금(원)

  @ApiProperty({
    description: '예약일',
    format: 'YYYY-MM-DD',
    example: '2023-09-23',
  })
  @IsInt()
  reservationDate: string; // 예약시간

  @ApiProperty({
    description: '예약시간',
    format: 'hh:mm',
    example: '19:30',
  })
  @IsInt()
  reservationTime: string; // 예약 시간

  @ApiProperty({ description: '출발지의 위도값' })
  @IsInt()
  departureLat: number; //출발위도
  @ApiProperty({ description: '출발지의 경도값' })
  @IsInt()
  departureLng: number; //출발경도

  @ApiProperty({ description: '출발지 주소' })
  @IsInt()
  departureAddress: string;

  @ApiProperty({ description: '출발지 주소 상세', required: false })
  @IsInt()
  departureAddressDetail?: string;

  @ApiProperty({ description: '도착지 위도값' })
  @IsInt()
  arrivalLat: number;

  @ApiProperty({ description: '도착지 경도값' })
  @IsInt()
  arrivalLng: number;

  @ApiProperty({ description: '도착지 주소' })
  @IsInt()
  arrivalAddress: string; // 도착주소

  @ApiProperty({ description: '도착지 주소 상세', required: false })
  @IsInt()
  arrivalAddressDetail?: string; //도착 상세주소

  @ApiProperty({ description: '출발주소 (다국어)', required: false })
  @IsInt()
  departureAddressMultiLang?: string; //출발주소 (다국어)

  @ApiProperty({ description: '출발 상세주소 (다국어)', required: false })
  @IsInt()
  departureAddressDetailMultiLang?: string; // 출발 상세주소 (다국어)

  @ApiProperty({ description: '도착주소 (다국어)', required: false })
  @IsInt()
  arrivalAddressMultiLang?: string; //도착주소 (다국어)

  @ApiProperty({ description: '도착 상세주소 (다국어)', required: false })
  @IsInt()
  arrivalAddressDetailMultiLang?: string; //도착 상세주소 (다국어)
}
