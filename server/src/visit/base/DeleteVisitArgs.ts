import { ArgsType, Field } from "@nestjs/graphql";
import { VisitWhereUniqueInput } from "./VisitWhereUniqueInput";

@ArgsType()
class DeleteVisitArgs {
  @Field(() => VisitWhereUniqueInput, { nullable: false })
  where!: VisitWhereUniqueInput;
}

export { DeleteVisitArgs };
