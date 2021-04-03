import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Setting } from "../api/setting/Setting";
import { SettingCreateInput } from "../api/setting/SettingCreateInput";

const INITIAL_VALUES = {} as SettingCreateInput;

export const CreateSetting = (): React.ReactElement => {
  useBreadcrumbs("/settings/new", "Create Setting");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Setting,
    AxiosError,
    SettingCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/settings", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/settings"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: SettingCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Setting"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Name" name="name" />
          </div>
          <div>
            <TextField label="Value" name="value" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
