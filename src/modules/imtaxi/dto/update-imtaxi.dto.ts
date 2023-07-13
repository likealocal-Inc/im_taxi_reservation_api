import { PartialType } from '@nestjs/mapped-types';
import { CreateImtaxiDto } from './create.imtaxi.dto';

export class UpdateImtaxiDto extends PartialType(CreateImtaxiDto) {}
