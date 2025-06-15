import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends OmitType(
  PartialType(CreateTransactionDto),
  ['userId'],
) {}
