import { Global, Injectable } from '@nestjs/common';
import { Pool, PoolClient, QueryResultRow } from 'pg';
import { QueryParams } from './interfaces/query-params.interface';

@Global()
@Injectable()
export class Postgres {
  private pool: Pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
  });
  private client: PoolClient;

  private async connect() {
    this.client = await this.pool.connect();
  }

  private async disconnect() {
    this.client.release();
  }

  async exec<R extends QueryResultRow = any, I = any[]>({
    query,
    params,
  }: QueryParams<I>): Promise<Array<R>> {
    try {
      await this.connect();
      return (await this.client.query(query, params)).rows;
    } finally {
      this.disconnect();
    }
  }
}
