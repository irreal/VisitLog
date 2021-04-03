import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { VisitList } from "./VisitList";
import { CreateVisit } from "./CreateVisit";
import { Visit } from "./Visit";

export const VisitIndex = (): React.ReactElement => {
  useBreadcrumbs("/visits/", "Visits");

  return (
    <Switch>
      <PrivateRoute exact path={"/visits/"} component={VisitList} />
      <PrivateRoute path={"/visits/new"} component={CreateVisit} />
      <PrivateRoute path={"/visits/:id"} component={Visit} />
    </Switch>
  );
};
