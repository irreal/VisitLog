import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { SettingList } from "./SettingList";
import { CreateSetting } from "./CreateSetting";
import { Setting } from "./Setting";

export const SettingIndex = (): React.ReactElement => {
  useBreadcrumbs("/settings/", "Settings");

  return (
    <Switch>
      <PrivateRoute exact path={"/settings/"} component={SettingList} />
      <PrivateRoute path={"/settings/new"} component={CreateSetting} />
      <PrivateRoute path={"/settings/:id"} component={Setting} />
    </Switch>
  );
};
