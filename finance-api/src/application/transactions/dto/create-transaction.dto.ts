import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { TransactionType } from 'src/model/enum/transaction-type.enum';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @Min(1, { message: 'Amount must be greater than 0.' })
  @IsNotEmpty()
  amount: number;

  @IsEnum(TransactionType, {
    message: 'Type must be EARNING, EXPENSE or INVESTMENT.',
  })
  @Transform(({ value }) => value.trim().toUpperCase())
  @IsNotEmpty()
  type: TransactionType;
}
