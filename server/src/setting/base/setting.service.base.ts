import { PrismaService } from "nestjs-prisma";

import {
  FindOneSettingArgs,
  FindManySettingArgs,
  SettingCreateArgs,
  SettingUpdateArgs,
  SettingDeleteArgs,
  Subset,
  Setting,
} from "@prisma/client";

export class SettingServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManySettingArgs>(
    args: Subset<T, FindManySettingArgs>
  ): Promise<Setting[]> {
    return this.prisma.setting.findMany(args);
  }
  async findOne<T extends FindOneSettingArgs>(
    args: Subset<T, FindOneSettingArgs>
  ): Promise<Setting | null> {
    return this.prisma.setting.findOne(args);
  }
  async create<T extends SettingCreateArgs>(
    args: Subset<T, SettingCreateArgs>
  ): Promise<Setting> {
    return this.prisma.setting.create<T>(args);
  }
  async update<T extends SettingUpdateArgs>(
    args: Subset<T, SettingUpdateArgs>
  ): Promise<Setting> {
    return this.prisma.setting.update<T>(args);
  }
  async delete<T extends SettingDeleteArgs>(
    args: Subset<T, SettingDeleteArgs>
  ): Promise<Setting> {
    return this.prisma.setting.delete(args);
  }
}
