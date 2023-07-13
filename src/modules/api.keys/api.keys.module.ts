import { Module } from '@nestjs/common';
import { ApiKeysService } from './api.keys.service';
import { ApiKeysController } from './api.keys.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ApiKeysController],
  providers: [ApiKeysService],
})
export class ApiKeysModule {}
