import { ApiProperty } from '@nestjs/swagger';

export class UsageListResponseDto {
  @ApiProperty({
    description: '',
  })
  boardingHistoryIdx: number;

  @ApiProperty({
    description:
      '탑승상태 (1:호출,2:호출취소,3:배차,4:배차거절,5:배차실패,6:배차취소-사용자,7:배차취소-기사,8:도착,9:탑승,10:출발,11:미탑승신고,12:주행중지,13:하차,14:대기,15:대기후 출발,20:예약취소)',
  })
  boardingStatus: string;

  @ApiProperty({ description: '탑승상태 명칭' })
  boardingStatusName: string;

  @ApiProperty({ description: '예상금액' })
  estimatedAmount: number;

  @ApiProperty({ description: '예상거리 (m 단위. 10.35km = 10350)' })
  estimatedDistance: number;

  @ApiProperty({ description: '출발위도' })
  departureLat: number;

  @ApiProperty({ description: '출발경도' })
  departureLng: number;

  @ApiProperty({ description: '출발주소' })
  departureAddress: string;

  @ApiProperty({ description: '출발 상세주소' })
  departureAddressDetail: string;

  @ApiProperty({ description: '출발 일시' })
  departureDateTime: string;

  @ApiProperty({ description: '도착위도' })
  arrivalLat: number;

  @ApiProperty({ description: '도착경도' })
  arrivalLng: number;

  @ApiProperty({ description: '도착주소' })
  arrivalAddress: string;

  @ApiProperty({ description: '도착 상세주소' })
  arrivalAddressDetail: string;

  @ApiProperty({ description: '도착 일시' })
  arrivalDateTime: string;

  @ApiProperty({ description: '총 운행 거리 (m 단위. 12.02km = 12020)' })
  drivingDistance: number;

  @ApiProperty({ description: '차량 번호' })
  carNumber: string;

  @ApiProperty({ description: '승인금액' })
  approvalAmount: number;

  @ApiProperty({ description: '승인 일시' })
  approvalDateTime: string;

  @ApiProperty({ description: '운행요금' })
  fare: number;

  @ApiProperty({ description: '통행요금' })
  toll: number;

  @ApiProperty({ description: '추가요금' })
  additionalAmount: number;

  @ApiProperty({ description: '할인금액' })
  discountAmount: number;

  @ApiProperty({ description: '호출종류 (1:즉시호출, 2:예약호출)' })
  callType: string;

  @ApiProperty({ description: '기사배정일시' })
  driverAssignDateTime: string;

  @ApiProperty({ description: '운행경과일자' })
  dayAfter: number;

  @ApiProperty({ description: '사용 포인트' })
  usePoint: number;

  @ApiProperty({ description: '예약 여부 (Y, N)' })
  isReservation: boolean;

  @ApiProperty({ description: '예약 유형(2: 시간대절, 4:편도예약)' })
  reservationType: number;

  @ApiProperty({ description: '예약 유형 이름' })
  reservationTypeName: string;

  @ApiProperty({ description: '예약 취소여부 (Y, N)' })
  isReservationCancel: string;

  @ApiProperty({ description: '예약취소일시' })
  reservationCancelDateTime: string;

  @ApiProperty({ description: '예약일시(탑승예정)' })
  reservationDateTime: string;

  @ApiProperty({ description: '예약 취소 수수료' })
  reservationCancellationFee: number;

  @ApiProperty({ description: '예약 취소 승인일시' })
  reservationCancellationFeeApprovalDateTime: string;

  @ApiProperty({ description: '예약 취소 수수료 결제 실패여부(Y, N)' })
  isReservationCancellationFeePaymentFail: string;

  @ApiProperty({ description: '예약 취소 수수료 결제 실패메시지' })
  reservationCancellationFeePaymentFailMsg: string;

  @ApiProperty({ description: '호출 취소수수료 여부 (Y, N))' })
  isCallCancellationFee: boolean;

  @ApiProperty({ description: '호출 취소수수료 금액' })
  callCancellationFeeAmount: number;

  @ApiProperty({ description: '호출 취소수수료 승인일시' })
  callCancellationFeeApprovalDateTime: string;

  @ApiProperty({ description: '호출 취소수수료 설명' })
  callCancellationFeeDescription: string;

  @ApiProperty({ description: '배차취소 일시' })
  dispatchCancelDateTime: string;

  @ApiProperty({ description: '사용자취소 설명' })
  userCancelDescription: string;

  @ApiProperty({ description: '기사취소 설명' })
  driverCancelDescription: string;

  @ApiProperty({ description: '예약취소 설명' })
  reservationCancelDescription: string;

  @ApiProperty({ description: '환불요금' })
  refundAmount: number;
}
