import { ArgsType, Field } from "@nestjs/graphql";
import { SettingWhereUniqueInput } from "./SettingWhereUniqueInput";

@ArgsType()
class FindOneSettingArgs {
  @Field(() => SettingWhereUniqueInput, { nullable: false })
  where!: SettingWhereUniqueInput;
}

export { FindOneSettingArgs };
