import { ArgsType, Field } from "@nestjs/graphql";
import { VisitWhereUniqueInput } from "./VisitWhereUniqueInput";
import { VisitUpdateInput } from "./VisitUpdateInput";

@ArgsType()
class UpdateVisitArgs {
  @Field(() => VisitWhereUniqueInput, { nullable: false })
  where!: VisitWhereUniqueInput;
  @Field(() => VisitUpdateInput, { nullable: false })
  data!: VisitUpdateInput;
}

export { UpdateVisitArgs };
