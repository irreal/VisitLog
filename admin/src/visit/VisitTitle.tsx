import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Visit } from "../api/visit/Visit";

type Props = { id: string };

export const VisitTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Visit,
    AxiosError,
    [string, string]
  >(["get-/api/visits", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/visits"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/visits"}/${id}`} className="entity-id">
      {data?.description && data?.description.length
        ? data.description
        : data?.id}
    </Link>
  );
};
