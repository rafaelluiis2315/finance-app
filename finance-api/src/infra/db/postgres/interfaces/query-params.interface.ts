import { QueryConfig, QueryConfigValues } from 'pg';

export interface QueryParams<I> {
  query: string | QueryConfig<I>;
  params?: QueryConfigValues<I>;
}
