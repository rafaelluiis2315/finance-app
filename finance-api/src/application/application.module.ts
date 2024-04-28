import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UseCasesModule } from './use-cases/use-cases.module';

@Module({
  imports: [UsersModule, UseCasesModule],
})
export class ApplicationModule {}
