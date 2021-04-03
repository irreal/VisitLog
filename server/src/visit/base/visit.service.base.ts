import { PrismaService } from "nestjs-prisma";

import {
  FindOneVisitArgs,
  FindManyVisitArgs,
  VisitCreateArgs,
  VisitUpdateArgs,
  VisitDeleteArgs,
  Subset,
  Visit,
} from "@prisma/client";

export class VisitServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async findMany<T extends FindManyVisitArgs>(
    args: Subset<T, FindManyVisitArgs>
  ): Promise<Visit[]> {
    return this.prisma.visit.findMany(args);
  }
  async findOne<T extends FindOneVisitArgs>(
    args: Subset<T, FindOneVisitArgs>
  ): Promise<Visit | null> {
    return this.prisma.visit.findOne(args);
  }
  async create<T extends VisitCreateArgs>(
    args: Subset<T, VisitCreateArgs>
  ): Promise<Visit> {
    return this.prisma.visit.create<T>(args);
  }
  async update<T extends VisitUpdateArgs>(
    args: Subset<T, VisitUpdateArgs>
  ): Promise<Visit> {
    return this.prisma.visit.update<T>(args);
  }
  async delete<T extends VisitDeleteArgs>(
    args: Subset<T, VisitDeleteArgs>
  ): Promise<Visit> {
    return this.prisma.visit.delete(args);
  }
}
