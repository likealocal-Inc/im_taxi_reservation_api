import axios, { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { ErrorLogUtils } from './error.log.utils';
import { config } from 'process';

export class ApiUtils {
  constructor(private readonly httpService: HttpService) {}

  /**
   * 에러 파일에 작성하기
   * @param data
   */
  async __writeErrorLog(data: any) {
    await new ErrorLogUtils().write(data);
  }

  /**
   * API호출 리턴값 체크
   * @param data
   * @returns
   */
  async __checkResponse(data): Promise<any> {
    const code = data['code'];
    if (code === 200) {
      return data;
    }
    return data;
  }

  /**
   * 헤더 만들기
   * @param accessToken
   * @returns
   */
  async makeHeadersAndParams(headers = {}, params = {}): Promise<any> {
    return {
      headers,
      params,
    };
  }

  async post(url: string, headers = {}, params = {}) {
    const res = await axios.post(url, params, { headers });
    return res.data;
  }

  async put(url: string, headers = {}, params = {}) {
    const res = await axios.put(url, params, { headers });
    console.log(res);
    return res.data;
  }

  /**
   * API 호출
   * @param url
   * @param headersAndParams
   * @returns
   */
  async get(url: string, headers = {}): Promise<any> {
    const res = await axios.get(url, { headers });
    return res.data;
  }
}
