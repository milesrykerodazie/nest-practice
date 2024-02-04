import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { PrismaModule } from './prisma-service/prisma.module';
import { PrismaService } from './prisma-service/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [CommonService, PrismaService],
  exports: [CommonService],
})
export class CommonModule {}
