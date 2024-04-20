import { Inject, Injectable } from '@nestjs/common';
import { Postgres } from './db/postgres/postgres';

@Injectable()
export class AppService {
  constructor(@Inject(Postgres) private readonly dbClient: Postgres) {}
  async getHello() {
    return await this.dbClient.connect({ query: 'SELECT * FROM public.user;' });
  }
}
