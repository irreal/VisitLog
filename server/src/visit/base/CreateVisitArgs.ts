import { ArgsType, Field } from "@nestjs/graphql";
import { VisitCreateInput } from "./VisitCreateInput";

@ArgsType()
class CreateVisitArgs {
  @Field(() => VisitCreateInput, { nullable: false })
  data!: VisitCreateInput;
}

export { CreateVisitArgs };
