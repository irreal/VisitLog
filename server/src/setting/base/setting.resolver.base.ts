import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateSettingArgs } from "./CreateSettingArgs";
import { UpdateSettingArgs } from "./UpdateSettingArgs";
import { DeleteSettingArgs } from "./DeleteSettingArgs";
import { FindManySettingArgs } from "./FindManySettingArgs";
import { FindOneSettingArgs } from "./FindOneSettingArgs";
import { Setting } from "./Setting";
import { SettingService } from "../setting.service";

@graphql.Resolver(() => Setting)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SettingResolverBase {
  constructor(
    protected readonly service: SettingService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Setting])
  @nestAccessControl.UseRoles({
    resource: "Setting",
    action: "read",
    possession: "any",
  })
  async settings(
    @graphql.Args() args: FindManySettingArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Setting[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Setting",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Setting, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Setting",
    action: "read",
    possession: "own",
  })
  async setting(
    @graphql.Args() args: FindOneSettingArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Setting | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Setting",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Setting)
  @nestAccessControl.UseRoles({
    resource: "Setting",
    action: "create",
    possession: "any",
  })
  async createSetting(
    @graphql.Args() args: CreateSettingArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Setting> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Setting",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Setting"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Setting)
  @nestAccessControl.UseRoles({
    resource: "Setting",
    action: "update",
    possession: "any",
  })
  async updateSetting(
    @graphql.Args() args: UpdateSettingArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Setting | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Setting",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Setting"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Setting)
  @nestAccessControl.UseRoles({
    resource: "Setting",
    action: "delete",
    possession: "any",
  })
  async deleteSetting(
    @graphql.Args() args: DeleteSettingArgs
  ): Promise<Setting | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
