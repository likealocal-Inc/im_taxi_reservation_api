import { ApiKeys } from '@prisma/client';

export default class ApiKeyEntity {
  id: string;
  createdAt: Date;
  updated: Date;
  key: string;
  service: string;
  else01: string;
  else02: string;
}
