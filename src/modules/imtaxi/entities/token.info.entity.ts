export class TokenInfoEntity {
  id: string;
  createdAt: Date;
  updated: Date;
  accessToken: string;
  expiresIn: string;
  refreshToken: string;
  refreshTokenExpiresIn: string;
  isDormant: string;
}
