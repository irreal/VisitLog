import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Visit } from "../api/visit/Visit";

type Data = Visit[];

type Props = Omit<SelectFieldProps, "options">;

export const VisitSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>(
    "select-/api/visits",
    async () => {
      const response = await api.get("/api/visits");
      return response.data;
    }
  );

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label:
            item.description && item.description.length
              ? item.description
              : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
