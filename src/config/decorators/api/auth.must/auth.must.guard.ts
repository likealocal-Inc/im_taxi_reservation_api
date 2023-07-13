import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_MUST_KEY } from './auth.must.decorator';
import { ApiKeysService } from '../../../../modules/api.keys/api.keys.service';

@Injectable()
export class AuthMustGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly apiKeysService: ApiKeysService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const mustAuthRes = this.reflector.getAllAndOverride(AUTH_MUST_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // !!!!!!!!!!!중요!!!!!!!!!!!!
    // 어노테이션이 없으면 누구나 호출가능
    if (mustAuthRes === undefined) {
      return true;
    }

    const headers = context.switchToHttp().getRequest().headers;

    try {
      const res = await this.apiKeysService.countApiKeyAndService(
        headers['api-key'],
        headers['service'],
      );
      if (res === 0) {
        return false;
      }
      context.switchToHttp().getRequest().apiKey = headers['api-key'];
    } catch (error) {}
    return true;
  }
}
