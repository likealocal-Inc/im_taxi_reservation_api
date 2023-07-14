import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './config/prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ApiKeysModule } from './modules/api.keys/api.keys.module';
import { ImtaxiModule } from './modules/imtaxi/imtaxi.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthMustGuard } from './config/decorators/api/auth.must/auth.must.guard';
import { ApiKeysService } from './modules/api.keys/api.keys.service';
import { HttpExceptionFilter } from './config/filters/http.exception.filter';
import { LoggingInterceptor } from './config/interceptor/logger.interceptor';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule,
    PrismaModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'files') }),
    ApiKeysModule,
    ImtaxiModule,
  ],
  providers: [
    ApiKeysService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    { provide: APP_GUARD, useClass: AuthMustGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
