import { ArgsType, Field } from "@nestjs/graphql";
import { SettingWhereUniqueInput } from "./SettingWhereUniqueInput";

@ArgsType()
class DeleteSettingArgs {
  @Field(() => SettingWhereUniqueInput, { nullable: false })
  where!: SettingWhereUniqueInput;
}

export { DeleteSettingArgs };
