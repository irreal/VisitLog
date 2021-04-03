import { ArgsType, Field } from "@nestjs/graphql";
import { SettingWhereUniqueInput } from "./SettingWhereUniqueInput";
import { SettingUpdateInput } from "./SettingUpdateInput";

@ArgsType()
class UpdateSettingArgs {
  @Field(() => SettingWhereUniqueInput, { nullable: false })
  where!: SettingWhereUniqueInput;
  @Field(() => SettingUpdateInput, { nullable: false })
  data!: SettingUpdateInput;
}

export { UpdateSettingArgs };
