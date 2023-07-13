// import { HttpService } from '@nestjs/axios';
// import { ApiUtils } from './api.utils';

// let tokenString = '';

// /**
//  * 아임웹 주문 데이터 조회 유틸
//  */
// export class IamwebUtils {
//   apiUtils: ApiUtils;
//   constructor(private readonly httpService: HttpService) {
//     this.apiUtils = new ApiUtils(httpService);
//   }

//   /**
//    * 액세스 토큰 조회
//    * @returns
//    */
//   async __getAcessToken(isNeedNew = true): Promise<string> {
//     if (
//       isNeedNew ||
//       tokenString === null ||
//       tokenString === undefined ||
//       tokenString === ''
//     ) {
//       console.log('######### 아임웨 토큰 호출 #########');

//       const res = await this.apiUtils.call(process.env.IAMWEB_API_GETTOKEN_URL);

//       if (res === undefined) return;

//       const newToken = res['access_token'];
//       tokenString = newToken;
//       return newToken;
//     }
//     return tokenString;
//   }

//   async __getIamwebRequest(accessToken: string): Promise<any> {
//     const url = 'https://api.imweb.me/v2/shop/inquirys';
//     const res = await this.apiUtils.call(
//       url,
//       await this.apiUtils.makeHeadersAndParams({ 'access-token': accessToken }),
//     );

//     return res;
//   }

//   /**
//    * 품폭 주문 목록 조회 (https://developers.imweb.me/orders/prodOrders)
//    * @param accessToken
//    * @param orderId
//    * @returns
//    */
//   // async __getIamwebOrderItemList(
//   //   orderId: string,
//   //   accessToken: string,
//   // ): Promise<IamwebProductModel> {
//   //   const url = `https://api.imweb.me/v2/shop/orders/${orderId}/prod-orders`;
//   //   const res = await this.apiUtils.call(
//   //     url,
//   //     await this.apiUtils.makeHeadersAndParams({ 'access-token': accessToken }),
//   //   );

//   //   if (res === undefined || res.data == undefined) return;

//   //   return new IamwebProductModel(res.data[0]);
//   // }

//   /**
//    * 주문리스트 조회
//    * @param accessToken
//    * @param startTimeStatmp
//    * @param endTimeStatmp
//    * @returns
//    */
//   async __getIamwebOrderList(
//     startTimeStatmp: string,
//     endTimeStatmp: string,
//     accessToken: string,
//   ) {
//     const res = await this.apiUtils.call(
//       'https://api.imweb.me/v2/shop/orders',
//       await this.apiUtils.makeHeadersAndParams(
//         { 'access-token': accessToken },
//         {
//           order_date_from: startTimeStatmp.substring(0, 10),
//           order_date_to: endTimeStatmp.substring(0, 10),
//         },
//       ),
//     );

//     if (res === undefined) return;

//     return res['data'];
//   }

//   /**
//    * 아임웹 주문 데이터 조회
//    * @param iamwebOrderNo
//    * @returns
//    */
//   async __getIamwebOrder(iamwebOrderNo: string, accessToken: string) {
//     const res = await this.apiUtils.call(
//       `https://api.imweb.me/v2/shop/orders/${iamwebOrderNo}`,
//       await this.apiUtils.makeHeadersAndParams({ 'access-token': accessToken }),
//     );

//     if (res === undefined) return;

//     return res['data'];
//   }
// }
