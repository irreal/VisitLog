import { ArgsType, Field } from "@nestjs/graphql";
import { VisitWhereInput } from "./VisitWhereInput";

@ArgsType()
class FindManyVisitArgs {
  @Field(() => VisitWhereInput, { nullable: true })
  where?: VisitWhereInput;
}

export { FindManyVisitArgs };
