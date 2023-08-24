import { Controller, Post, Body, Req } from '@nestjs/common';
import { ImtaxiService } from './imtaxi.service';
import { FareInfoDto } from './dto/fare.info.dto';
import { ReservationfareInfo } from './dto/fare.res.dto';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationApprovalDto } from './dto/reservation.approval.dto';
import { AUTH_MUST } from 'src/config/decorators/api/auth.must/auth.must.decorator';
import { ReservationEntity } from './entities/reservation.entity';
import { ReservationCancelReasonDto } from './dto/reservation.cancel.reason.dto';
import { ReservationCancelReasonResponseDto } from './dto/reservation.cancel.reason.response.dto';
import { ReservationCancelDto } from './dto/reservation.cancel.dto';
import { UsageListDto } from './dto/usage.list.dto';
import {
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsageListResponseDto } from './dto/usage.list.response';
import { HealthCheckResponseDto } from './dto/healthcheck.response.dto';
import { ReservationFindlDto } from './dto/reservation.find';

@ApiTags('IM TAXI')
@AUTH_MUST()
@Controller('imtaxi')
export class ImtaxiController {
  constructor(private readonly imtaxiService: ImtaxiService) {}

  /**
   * 예약요금 정보 조회
   * @returns
   */
  @Post('fare.info')
  @ApiOperation({
    summary: '택시요금 조회하기',
    description:
      '택시예약을 하기 전에 출발지와 도착지 정보를 넣어서 요금을 확인',
  })
  @ApiHeader({
    name: 'api-key',
    description: '서버에서 제공한 서비스 API KEY',
    required: true,
  })
  @ApiHeader({
    name: 'service',
    description: '서버에 사용요청한 서비스 이름',
    required: true,
  })
  @ApiBody({ type: FareInfoDto })
  @ApiOkResponse({
    description: '요금조회결과 데이터',
    type: ReservationfareInfo,
    status: '2XX',
  })
  async getFareInfo(
    @Body() fareInfoDto: FareInfoDto,
  ): Promise<ReservationfareInfo> {
    return await this.imtaxiService.getFareInfo(fareInfoDto);
  }

  /**
   * 예약등록
   * @param reservationDto
   * @returns
   */
  @Post('reservation')
  @ApiOperation({
    summary: '택시예약 등록',
    description: '택시예약등록처리',
  })
  @ApiHeader({
    name: 'api-key',
    description: '서버에서 제공한 서비스 API KEY',
    required: true,
  })
  @ApiHeader({
    name: 'service',
    description: '서버에 사용요청한 서비스 이름',
    required: true,
  })
  @ApiBody({ type: ReservationDto })
  @ApiOkResponse({
    description: '택시예약 ID',
    type: String,
    status: '2XX',
  })
  async reservation(
    @Req() req: any,
    @Body() reservationDto: ReservationDto,
  ): Promise<any> {
    return await this.imtaxiService.reservation(reservationDto, req.apiKey);
  }

  /**
   * 예약승인
   * @param reservationDto
   * @returns
   */
  @Post('reservation.approval')
  @ApiOperation({
    summary: '택시예약 승인',
    description: '택시예약승인처리',
  })
  @ApiHeader({
    name: 'api-key',
    description: '서버에서 제공한 서비스 API KEY',
    required: true,
  })
  @ApiHeader({
    name: 'service',
    description: '서버에 사용요청한 서비스 이름',
    required: true,
  })
  @ApiBody({ type: ReservationApprovalDto })
  @ApiOkResponse({
    description: '택시예약 ID',
    type: String,
    status: '2XX',
  })
  async reservationApproval(
    @Body() reservationDto: ReservationApprovalDto,
  ): Promise<any> {
    return await this.imtaxiService.reservationApproval(reservationDto);
  }

  /**
   * 예약내역
   * @param reservationDto
   * @returns
   */
  // @Post('reservation.list')
  // @ApiOperation({
  //   summary: '택시예약내역',
  //   description: '택시예약내역',
  // })
  // @ApiHeader({
  //   name: 'api-key',
  //   description: '서버에서 제공한 서비스 API KEY',
  //   required: true,
  // })
  // @ApiHeader({
  //   name: 'service',
  //   description: '서버에 사용요청한 서비스 이름',
  //   required: true,
  // })
  // @ApiOkResponse({
  //   description: '택시예약 ID',
  //   type: ReservationEntity,
  //   isArray: true,
  //   status: '2XX',
  // })
  // async reservationList(): Promise<ReservationEntity[]> {
  //   return await this.imtaxiService.reservationListFromIMServer();
  // }

  // /**
  //  * 예약취소이유조회
  //  * @param reservationDto
  //  * @returns
  //  */
  @Post('reservation.cancel.reason')
  @ApiOperation({
    summary: '택시예약취소 사유 조회',
    description: '택시예약취소 사유 조회',
  })
  @ApiHeader({
    name: 'api-key',
    description: '서버에서 제공한 서비스 API KEY',
    required: true,
  })
  @ApiHeader({
    name: 'service',
    description: '서버에 사용요청한 서비스 이름',
    required: true,
  })
  @ApiBody({ type: ReservationCancelReasonDto })
  @ApiOkResponse({
    description: '취소사유가 가능한 리스트',
    type: ReservationCancelReasonResponseDto,
    isArray: true,
    status: '2XX',
  })
  async reservationCancelReason(
    @Body() reservationDto: ReservationCancelReasonDto,
  ): Promise<ReservationCancelReasonResponseDto[]> {
    return await this.imtaxiService.reservationCancelReason(reservationDto);
  }

  /**
   * 예약취소
   * @param reservationDto
   * @returns
   */
  @Post('reservation.cancel')
  @ApiOperation({
    summary: '택시예약취소',
    description: '택시예약취소',
  })
  @ApiHeader({
    name: 'api-key',
    description: '서버에서 제공한 서비스 API KEY',
    required: true,
  })
  @ApiHeader({
    name: 'service',
    description: '서버에 사용요청한 서비스 이름',
    required: true,
  })
  @ApiBody({ type: ReservationCancelDto })
  @ApiOkResponse({
    description: '취소처리한 주문 ID',
    type: String,
    status: '2XX',
  })
  async reservationCancel(
    @Body() reservationDto: ReservationCancelDto,
  ): Promise<string> {
    return await this.imtaxiService.reservationCancel(reservationDto);
  }

  /**
   * 이용내역
   * @param reservationDto
   * @returns
   */
  @Post('usage.list')
  @ApiOperation({
    summary: '택시이용 내역',
    description: '택시이용 내역',
  })
  @ApiHeader({
    name: 'api-key',
    description: '서버에서 제공한 서비스 API KEY',
    required: true,
  })
  @ApiHeader({
    name: 'service',
    description: '서버에 사용요청한 서비스 이름',
    required: true,
  })
  @ApiBody({ type: UsageListDto })
  @ApiOkResponse({
    description: '이용내역 리스트',
    type: UsageListResponseDto,
    isArray: true,
    status: '2XX',
  })
  async usageList(
    @Body() reservationDto: UsageListDto,
  ): Promise<UsageListResponseDto[]> {
    return await this.imtaxiService.usageList(reservationDto);
  }

  /**
   * 헬스체크
   * @returns
   */
  @Post('healthcheck')
  @ApiOperation({
    summary: '서버살아 있는지 확인',
    description: '서버살아 있는지 확인',
  })
  @ApiHeader({
    name: 'api-key',
    description: '서버에서 제공한 서비스 API KEY',
    required: true,
  })
  @ApiHeader({
    name: 'service',
    description: '서버에 사용요청한 서비스 이름',
    required: true,
  })
  async healthCheck(): Promise<HealthCheckResponseDto> {
    return await this.imtaxiService.healthCheck();
  }

  /**
   * 헬스체크
   * @returns
   */
  @Post('find.reservation')
  @ApiOperation({
    summary: '예약ID로 예약데이터 조회',
    description: '예약ID로 예약데이터 조회',
  })
  @ApiHeader({
    name: 'api-key',
    description: '서버에서 제공한 서비스 API KEY',
    required: true,
  })
  @ApiHeader({
    name: 'service',
    description: '서버에 사용요청한 서비스 이름',
    required: true,
  })
  @ApiBody({ type: ReservationFindlDto })
  async findById(
    @Body() reservationFindlDto: ReservationFindlDto,
  ): Promise<any> {
    try {
      return await this.imtaxiService.findReservationById(
        reservationFindlDto.reservationId,
      );
    } catch (error) {
      console.log(error);
      return { ok: false, data: error };
    }
  }
}
