import { Global, Module } from '@nestjs/common';
import { Postgres } from './postgres/postgres';

@Global()
@Module({
  providers: [Postgres],
  exports: [Postgres],
})
export class DbModule {}
