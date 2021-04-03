import { Module } from "@nestjs/common";
import { VisitModuleBase } from "./base/visit.module.base";
import { VisitService } from "./visit.service";
import { VisitController } from "./visit.controller";
import { VisitResolver } from "./visit.resolver";

@Module({
  imports: [VisitModuleBase],
  controllers: [VisitController],
  providers: [VisitService, VisitResolver],
  exports: [VisitService],
})
export class VisitModule {}
