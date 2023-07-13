export const Config = {
  imtaxi: {
    url: 'http://119.28.152.89:19000/v1/',
    getHeader: async (accessToken = ''): Promise<any> => {
      return {
        'Accept-Language': 'ko',
        'X-Access-Token': accessToken,
        'X-IM-Client-Id': '80670d85163711ee8feb185644e1a118',
        'X-IM-Client-Secret':
          'be68286f84c1d931883c0e62f887573963123184cf9d1183095a49dd2271128e',
        'Content-Type': 'application/json',
      };
    },
  },
};
