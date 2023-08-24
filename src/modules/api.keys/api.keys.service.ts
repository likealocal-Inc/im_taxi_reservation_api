import { Injectable } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create.api.key.dto';
import { UpdateApiKeyDto } from './dto/update.api.key.dto';
import { PrismaService } from '../../config/prisma/prisma.service';
import { ElseUtils } from 'src/libs/core/utils/else.utils';

@Injectable()
export class ApiKeysService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createApiKeyDto: CreateApiKeyDto) {
    return await this.prisma.apiKeys.create({
      data: {
        key: await ElseUtils.getRandomNum(),
        service: createApiKeyDto.service,
        else01: createApiKeyDto.else01,
        else02: createApiKeyDto.else02,
      },
    });
  }

  async findAll() {
    return this.prisma.apiKeys.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.apiKeys.findUnique({ where: { id } });
  }

  /**
   *
   */
  async countApiKeyAndService(key: string, service: string) {
    return await this.prisma.apiKeys.count({ where: { key, service } });
  }

  async update(id: string, updateApiKeyDto: UpdateApiKeyDto) {
    return await this.prisma.apiKeys.update({
      where: { id },
      data: {
        key: await ElseUtils.getRandomNum(),
        service: updateApiKeyDto.service,
        else01: updateApiKeyDto.else01,
        else02: updateApiKeyDto.else02,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.apiKeys.delete({ where: { id } });
  }
}
