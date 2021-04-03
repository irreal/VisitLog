import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { VisitService } from "../visit.service";
import { VisitCreateInput } from "./VisitCreateInput";
import { VisitWhereInput } from "./VisitWhereInput";
import { VisitWhereUniqueInput } from "./VisitWhereUniqueInput";
import { VisitUpdateInput } from "./VisitUpdateInput";
import { Visit } from "./Visit";

export class VisitControllerBase {
  constructor(
    protected readonly service: VisitService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Visit })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Query() query: {},
    @common.Body() data: VisitCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Visit> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Visit",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Visit"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...query,
      data: data,
      select: {
        amount: true,
        createdAt: true,
        date: true,
        description: true,
        id: true,
        isPaid: true,
        note: true,
        price: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Visit] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    @common.Query() query: VisitWhereInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Visit[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Visit",
    });
    const results = await this.service.findMany({
      where: query,
      select: {
        amount: true,
        createdAt: true,
        date: true,
        description: true,
        id: true,
        isPaid: true,
        note: true,
        price: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Visit })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Query() query: {},
    @common.Param() params: VisitWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Visit | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Visit",
    });
    const result = await this.service.findOne({
      ...query,
      where: params,
      select: {
        amount: true,
        createdAt: true,
        date: true,
        description: true,
        id: true,
        isPaid: true,
        note: true,
        price: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Visit })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Query() query: {},
    @common.Param() params: VisitWhereUniqueInput,
    @common.Body()
    data: VisitUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Visit | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Visit",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Visit"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...query,
        where: params,
        data: data,
        select: {
          amount: true,
          createdAt: true,
          date: true,
          description: true,
          id: true,
          isPaid: true,
          note: true,
          price: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Visit })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Query() query: {},
    @common.Param() params: VisitWhereUniqueInput
  ): Promise<Visit | null> {
    try {
      return await this.service.delete({
        ...query,
        where: params,
        select: {
          amount: true,
          createdAt: true,
          date: true,
          description: true,
          id: true,
          isPaid: true,
          note: true,
          price: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
