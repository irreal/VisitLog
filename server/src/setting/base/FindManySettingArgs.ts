import { ArgsType, Field } from "@nestjs/graphql";
import { SettingWhereInput } from "./SettingWhereInput";

@ArgsType()
class FindManySettingArgs {
  @Field(() => SettingWhereInput, { nullable: true })
  where?: SettingWhereInput;
}

export { FindManySettingArgs };
