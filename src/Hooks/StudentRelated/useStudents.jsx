import React from "react";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../useaxiosSecure";

const useStudents = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: students = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allStudents");
      return res.data;
    },
  });

  return [students, loading, refetch];
};

export default useStudents;
