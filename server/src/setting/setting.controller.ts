import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SettingService } from "./setting.service";
import { SettingControllerBase } from "./base/setting.controller.base";

@swagger.ApiBasicAuth()
@swagger.ApiTags("settings")
@common.Controller("settings")
export class SettingController extends SettingControllerBase {
  constructor(
    protected readonly service: SettingService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
