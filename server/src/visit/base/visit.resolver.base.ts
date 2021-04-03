import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { CreateVisitArgs } from "./CreateVisitArgs";
import { UpdateVisitArgs } from "./UpdateVisitArgs";
import { DeleteVisitArgs } from "./DeleteVisitArgs";
import { FindManyVisitArgs } from "./FindManyVisitArgs";
import { FindOneVisitArgs } from "./FindOneVisitArgs";
import { Visit } from "./Visit";
import { VisitService } from "../visit.service";

@graphql.Resolver(() => Visit)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class VisitResolverBase {
  constructor(
    protected readonly service: VisitService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Visit])
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "read",
    possession: "any",
  })
  async visits(
    @graphql.Args() args: FindManyVisitArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Visit[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Visit",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Visit, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "read",
    possession: "own",
  })
  async visit(
    @graphql.Args() args: FindOneVisitArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Visit | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Visit",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Visit)
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "create",
    possession: "any",
  })
  async createVisit(
    @graphql.Args() args: CreateVisitArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Visit> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Visit",
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
        `providing the properties: ${properties} on ${"Visit"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Visit)
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "update",
    possession: "any",
  })
  async updateVisit(
    @graphql.Args() args: UpdateVisitArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Visit | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Visit",
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
        `providing the properties: ${properties} on ${"Visit"} update is forbidden for roles: ${roles}`
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

  @graphql.Mutation(() => Visit)
  @nestAccessControl.UseRoles({
    resource: "Visit",
    action: "delete",
    possession: "any",
  })
  async deleteVisit(
    @graphql.Args() args: DeleteVisitArgs
  ): Promise<Visit | null> {
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
