import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
  ToggleField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Visit as TVisit } from "../api/visit/Visit";
import { VisitUpdateInput } from "../api/visit/VisitUpdateInput";

export const Visit = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/visits/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TVisit,
    AxiosError,
    [string, string]
  >(["get-/api/visits", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/visits"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TVisit, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/visits"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//visits");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TVisit, AxiosError, VisitUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/visits"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: VisitUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.description);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () =>
      pick(data, ["amount", "date", "description", "isPaid", "note", "price"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Visit"} ${
                  data?.description && data?.description.length
                    ? data.description
                    : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
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
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
