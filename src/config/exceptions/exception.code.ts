import { HttpStatus } from '@nestjs/common';

export class ExceptionCode {
  constructor(
    private readonly code: string,
    private readonly message: string,
    private readonly status: number,
  ) {}
  getCode = () => this.code;
  getMessage = () => this.message;
  getStatus = () => this.status;
}

export const ExceptionCodeList = {
  ERROR: new ExceptionCode('ERROR', 'ERROR', HttpStatus.INTERNAL_SERVER_ERROR),
  IM_TAXI: new ExceptionCode(
    'IM_TAXI.BAD_REQUEST',
    '아임택시 API 호출 오류',
    HttpStatus.BAD_REQUEST,
  ),
};
