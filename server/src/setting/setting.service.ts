import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { SettingServiceBase } from "./base/setting.service.base";

@Injectable()
export class SettingService extends SettingServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
