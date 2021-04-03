import { ArgsType, Field } from "@nestjs/graphql";
import { SettingCreateInput } from "./SettingCreateInput";

@ArgsType()
class CreateSettingArgs {
  @Field(() => SettingCreateInput, { nullable: false })
  data!: SettingCreateInput;
}

export { CreateSettingArgs };
