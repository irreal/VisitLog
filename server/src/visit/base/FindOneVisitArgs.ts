import { ArgsType, Field } from "@nestjs/graphql";
import { VisitWhereUniqueInput } from "./VisitWhereUniqueInput";

@ArgsType()
class FindOneVisitArgs {
  @Field(() => VisitWhereUniqueInput, { nullable: false })
  where!: VisitWhereUniqueInput;
}

export { FindOneVisitArgs };
