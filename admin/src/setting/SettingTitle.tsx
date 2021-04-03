import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Setting } from "../api/setting/Setting";

type Props = { id: string };

export const SettingTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Setting,
    AxiosError,
    [string, string]
  >(["get-/api/settings", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/settings"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/settings"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
