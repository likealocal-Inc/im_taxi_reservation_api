import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class FareInfoDto {
  @ApiProperty({
    enum: [2, 4],
    description:
      '예약종류(2:대절, 4:편도) 4번 편도 선택시 대절시간은 입력안함 ',
  })
  @IsInt()
  reservationType: 2 | 4; //예약종류(2:대절, 4:편도)

  @ApiProperty({
    required: false,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    description: '대절시간(1~10) - reservationType 2번(대절)선택시 입력',
  })
  @IsInt()
  rentalHour?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // 대절시간 1~10

  @ApiProperty({ enum: [1, 3], description: '(1:아이엠 베이직, 3:블랙)' })
  @IsInt()
  carType: 1 | 3; // (1:아이엠 베이직, 3:블랙)

  @ApiProperty({
    format: 'YYYY-MM-DD hh:mm',
    example: '2023-09-10 19:30',
    description: '예약일시(2023-02-02 11:30)',
  })
  @IsString()
  reservationDateTime: string;

  @ApiProperty({ description: '출발지의 위도값' })
  @IsInt()
  departureLat: number;

  @ApiProperty({ description: '출발지의 경도값' })
  @IsInt()
  departureLng: number;

  @ApiProperty({ description: '도착지 위도값' })
  @IsInt()
  arrivalLat: number;

  @ApiProperty({ description: '출발지의 경도값' })
  @IsInt()
  arrivalLng: number;
}
