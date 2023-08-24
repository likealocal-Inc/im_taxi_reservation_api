import { Injectable } from '@nestjs/common';
import { FareInfoDto } from './dto/fare.info.dto';
import { ApiUtils } from 'src/libs/core/utils/api.utils';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { TokenInfoEntity } from './entities/token.info.entity';
import { ElseUtils } from 'src/libs/core/utils/else.utils';
import { ReservationfareInfo } from './dto/fare.res.dto';
import { Config } from 'src/config/config';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationApprovalDto } from './dto/reservation.approval.dto';
import { ReservationEntity } from './entities/reservation.entity';
import { DateUtil } from 'src/libs/core/utils/date.utils';
import { ReservationCancelReasonDto } from './dto/reservation.cancel.reason.dto';
import { ReservationCancelDto } from './dto/reservation.cancel.dto';
import { UsageListDto } from './dto/usage.list.dto';
import { ReservationCancelReasonResponseDto } from './dto/reservation.cancel.reason.response.dto';
import { UsageListResponseDto } from './dto/usage.list.response';
import { CustomException } from 'src/config/exceptions/custom.exception';
import { ExceptionCodeList } from 'src/config/exceptions/exception.code';

@Injectable()
export class ImtaxiService {
  apiUtils: ApiUtils;
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {
    this.apiUtils = new ApiUtils(httpService);
  }

  /**
   * 아임택시 호출 에러메세지에서 메세지 뽑아내기
   * @param error
   * @returns
   */
  getMessageFromIMTaxiAPI(error) {
    return error.response !== undefined
      ? error.response.data !== undefined
        ? error.response.data.error !== undefined
          ? error.response.data.error
          : error.response.data
        : error.response
      : error;
  }
  /**
   * 헤드 생성
   * @param isAccessTokenInclude
   * @returns
   */
  async getHeader(isAccessTokenInclude = false): Promise<any> {
    if (isAccessTokenInclude) {
      const tokenInfo: TokenInfoEntity = await this.checkToken();
      return await Config.imtaxi.getHeader(tokenInfo.accessToken);
    } else {
      return await Config.imtaxi.getHeader();
    }
  }

  /**
   * 토큰 체크
   * - 토큰에 문제가 있으면 로그인시도하여 재생성
   * @returns
   */
  async checkToken(): Promise<TokenInfoEntity> {
    const token: TokenInfoEntity = await this.prisma.tokenInfo.findFirst();

    // 토큰정보가 없으면 토큰 생성
    if (token === undefined || token === null) {
      return await this.login();
    } else {
      const url = `${Config.imtaxi.url}/auth/token`;
      try {
        await this.apiUtils.get(
          url,
          await Config.imtaxi.getHeader(token.accessToken),
        );

        return token;
      } catch (error) {
        if (error.response.data.error.type === 'Unauthorized') {
          return await this.login();
        } else {
          const msg = this.getMessageFromIMTaxiAPI(error);
          new CustomException(ExceptionCodeList.IM_TAXI, msg);
        }
      }
    }
  }

  /**
   * 로그인처리
   * @param tokenInfoId
   * @returns
   */
  async login(tokenInfoId = ''): Promise<TokenInfoEntity> {
    const url = `${Config.imtaxi.url}/account/signin`;
    try {
      const res = await this.apiUtils.post(url, await this.getHeader(), {
        phoneNumber: '821065412494',
      });

      let tokenInfo: TokenInfoEntity;
      if (tokenInfoId === '') {
        tokenInfo = await this.prisma.tokenInfo.create({ data: res });
      } else {
        tokenInfo = await this.prisma.tokenInfo.update({
          where: { id: tokenInfoId },
          data: res,
        });
      }

      return tokenInfo;
    } catch (error) {
      const msg = this.getMessageFromIMTaxiAPI(error);
      new CustomException(ExceptionCodeList.IM_TAXI, msg);
    }
  }

  /**
   * 요금산정
   * @param fareInfoDto
   * @returns
   */
  async getFareInfo(fareInfoDto: FareInfoDto): Promise<ReservationfareInfo> {
    const params = ElseUtils.toQueryString(fareInfoDto);
    const url = `${Config.imtaxi.url}/reservation/fareInfo?${params}`;
    try {
      const res: ReservationfareInfo = await this.apiUtils.get(
        url,
        await this.getHeader(true),
      );

      return res;
    } catch (error) {
      const msg = this.getMessageFromIMTaxiAPI(error);
      new CustomException(ExceptionCodeList.IM_TAXI, msg);
    }
  }

  /**
   * 예약등록
   * @param reservationDto
   * @returns
   */
  async reservation(
    reservationDto: ReservationDto,
    apiKey: string,
  ): Promise<any> {
    const url = `${Config.imtaxi.url}/reservation`;
    try {
      const res = await this.apiUtils.post(
        url,
        await this.getHeader(true),
        reservationDto,
      );
      const reservation: ReservationEntity =
        await this.prisma.reservation.create({
          data: {
            apiKey,
            registrationNo: res['registrationNo'],
            orderNo: await ElseUtils.getRandomNum(),
          },
        });

      return { id: reservation.id, registrationNo: reservation.registrationNo };
    } catch (error) {
      const msg = this.getMessageFromIMTaxiAPI(error);
      new CustomException(ExceptionCodeList.IM_TAXI, msg);
    }
  }

  /**
   *
   * @returns
   */
  async reservationListFromIMServer() {
    try {
      const url = `${Config.imtaxi.url}/reservaiton/history`;
      const res = await this.apiUtils.get(url, await this.getHeader(true));
      console.log(res);
      return res;
    } catch (error) {
      const msg = this.getMessageFromIMTaxiAPI(error);
      new CustomException(ExceptionCodeList.IM_TAXI, msg);
    }
  }

  /**
   * 주문내역조회
   * @returns
   */
  async reservationList(): Promise<ReservationEntity[]> {
    return this.prisma.reservation.findMany();
  }

  /**
   * 아이디로 예약조회
   */
  async findReservationById(id: string): Promise<ReservationEntity> {
    // 아이디로 예약조회
    return await this.prisma.reservation.findFirst({
      where: { id },
    });
  }

  /**
   * 예약승인
   * @param reservationApprovalDto
   * @returns
   */
  async reservationApproval(
    reservationApprovalDto: ReservationApprovalDto,
  ): Promise<any> {
    const url = `${Config.imtaxi.url}/reservation`;
    try {
      // 아이디로 예약조회
      let reservation = await this.findReservationById(
        reservationApprovalDto.registrationId,
      );

      // 조회값이 없으면 잘못된 호출
      if (reservation === undefined || reservation === null) {
        return;
      }

      // 예약승인처리
      const res = await this.apiUtils.put(url, await this.getHeader(true), {
        ...reservationApprovalDto,
        orderNo: reservation.orderNo,
      });

      console.log('-------');
      console.log(res);

      // 승인결과 DB에 업데이트
      reservation = await this.prisma.reservation.update({
        where: { id: reservation.id },
        data: {
          reservationBoardingHistoryIdx: res['registrationBoardingHistoryIdx'],
          reservationApprove: 1,
          reservationApproveDate: DateUtil.nowString('YYYY-MM-DD hh:mm'),
        },
      });
      console.log(reservation);
      return {
        id: reservation.id,
        registrationNo: reservation.registrationNo,
        reservationBoardingHistoryIdx:
          reservation.reservationBoardingHistoryIdx,
        reservationApproveDate: reservation.reservationApproveDate,
      };
    } catch (error) {
      const msg = this.getMessageFromIMTaxiAPI(error);
      new CustomException(ExceptionCodeList.IM_TAXI, msg);
    }
  }

  /**
   * 예약취소사유
   * @param reservationApprovalDto
   * @returns
   */
  async reservationCancelReason(
    reservationApprovalDto: ReservationCancelReasonDto,
  ): Promise<ReservationCancelReasonResponseDto[]> {
    try {
      // 아이디로 예약조회
      const reservation: ReservationEntity = await this.findReservationById(
        reservationApprovalDto.reservationId,
      );

      // 조회값이 없으면 잘못된 호출
      if (reservation === undefined || reservation === null) {
        return;
      }

      const url = `${Config.imtaxi.url}/reservation/cancel/reason/${reservation.reservationBoardingHistoryIdx}`;
      const res = await this.apiUtils.get(url, await this.getHeader(true));
      return res;
    } catch (error) {
      const msg = this.getMessageFromIMTaxiAPI(error);
      new CustomException(ExceptionCodeList.IM_TAXI, msg);
    }
  }

  /**
   * 취소
   * @param reservationCancelDto
   * @returns
   */
  async reservationCancel(
    reservationCancelDto: ReservationCancelDto,
  ): Promise<string> {
    try {
      let reservation: ReservationEntity = await this.findReservationById(
        reservationCancelDto.reservationId,
      );
      // 조회값이 없으면 잘못된 호출
      if (reservation === undefined || reservation === null) {
        return;
      }

      const url = `${Config.imtaxi.url}/reservation/cancel`;
      await this.apiUtils.post(url, await this.getHeader(true), {
        reservationBoardingHistoryIdx:
          reservation.reservationBoardingHistoryIdx,
        cancelType: reservationCancelDto.cancelType,
        reasonIdx: reservationCancelDto.reasonIdx,
      });

      reservation = await this.prisma.reservation.update({
        where: {
          id: reservationCancelDto.reservationId,
        },
        data: {
          isCancel: 1,
          cancelDate: DateUtil.nowString('YYYY-MM-DD hh:mm'),
        },
      });
      return reservation.id;
    } catch (error) {
      const msg = this.getMessageFromIMTaxiAPI(error);
      new CustomException(ExceptionCodeList.IM_TAXI, msg);
    }
  }

  /**
   * 이용내역리스트
   * @param usageListDto
   * @returns
   */
  async usageList(usageListDto: UsageListDto): Promise<UsageListResponseDto[]> {
    try {
      const reservation: ReservationEntity = await this.findReservationById(
        usageListDto.reservationId,
      );
      // 조회값이 없으면 잘못된 호출
      if (reservation === undefined || reservation === null) {
        return;
      }
      const url = `${Config.imtaxi.url}/history/usage/${reservation.reservationBoardingHistoryIdx}`;
      const res = await this.apiUtils.get(url, await this.getHeader(true));
      return res;
    } catch (error) {
      const msg = this.getMessageFromIMTaxiAPI(error);
      new CustomException(ExceptionCodeList.IM_TAXI, msg);
    }
  }

  /**
   * 헬스체크
   * @returns
   */
  async healthCheck() {
    try {
      const url = `${Config.imtaxi.url}/common/alive-check`;
      const res = await this.apiUtils.get(url, await this.getHeader(true));
      return res;
    } catch (error) {
      const msg = this.getMessageFromIMTaxiAPI(error);
      new CustomException(ExceptionCodeList.IM_TAXI, msg);
    }
  }
}
