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
  ToggleField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Visit } from "../api/visit/Visit";
import { VisitCreateInput } from "../api/visit/VisitCreateInput";

const INITIAL_VALUES = {} as VisitCreateInput;

export const CreateVisit = (): React.ReactElement => {
  useBreadcrumbs("/visits/new", "Create Visit");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Visit,
    AxiosError,
    VisitCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/visits", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/visits"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: VisitCreateInput) => {
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
            <FormHeader title={"Create Visit"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField type="number" label="Amount" name="amount" />
          </div>
          <div>
            <TextField type="date" label="Date" name="date" />
          </div>
          <div>
            <TextField label="Description" name="description" />
          </div>
          <div>
            <ToggleField label="IsPaid" name="isPaid" />
          </div>
          <div>
            <TextField label="Note" name="note" textarea />
          </div>
          <div>
            <TextField type="number" label="Price" name="price" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
