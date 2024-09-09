import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FileModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
