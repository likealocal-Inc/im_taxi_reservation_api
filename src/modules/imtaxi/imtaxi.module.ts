import { Module } from '@nestjs/common';
import { ImtaxiService } from './imtaxi.service';
import { ImtaxiController } from './imtaxi.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [ImtaxiController],
  providers: [ImtaxiService],
})
export class ImtaxiModule {}
