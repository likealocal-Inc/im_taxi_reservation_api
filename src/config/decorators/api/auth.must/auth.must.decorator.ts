import { SetMetadata } from '@nestjs/common';

/**
 * 사용자 인증 필수
 */
export const AUTH_MUST_KEY = 'AUTH_MUST_KEY';
export const AUTH_MUST = () => SetMetadata(AUTH_MUST_KEY, '');
