import { IsInt, IsString } from 'class-validator';

export class CreateApiKeyDto {
  @IsString()
  service: string;

  else01?: string;

  else02?: string;
}
