import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty({
    description: '사유',
  })
  reason: string;
  @ApiProperty({
    description: '내용',
  })
  message: string;
}
