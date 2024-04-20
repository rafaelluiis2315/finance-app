import { Module } from '@nestjs/common';
import { Postgres } from './postgres/postgres';

@Module({
  providers: [Postgres],
  exports: [Postgres],
})
export class DbModule {}
