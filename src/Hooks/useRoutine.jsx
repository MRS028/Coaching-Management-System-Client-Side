import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useaxiosSecure";

const useRoutine = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch routines
  const {
    data: routines = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["routines"],
    queryFn: async () => {
      const res = await axiosSecure.get("/routines");
      return res.data;
    },
  });

  // Mutation to update a routine
  const updateRoutineMutation = useMutation({
    mutationFn: async ({ className, version, updatedSchedule }) => {
      // Encode className & version to fix spaces issue
      const encodedClassName = encodeURIComponent(className);
      const encodedVersion = encodeURIComponent(version);

      const res = await axiosSecure.patch(`/routines/${encodedClassName}/${encodedVersion}`, {
        schedule: updatedSchedule,
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate and refetch routines after successful update
      queryClient.invalidateQueries(["routines"]);
      refetch(); // 🔥 Ensure immediate update in UI
    },
    onError: (error) => {
      console.error("Error updating routine:", error);
    },
  });

  // Function to update a specific routine
  const updateRoutine = (className, version, updatedSchedule) => {
    
    const encodedClassName = encodeURIComponent(className);
    const encodedVersion = encodeURIComponent(version);
  
    updateRoutineMutation.mutate({ className: encodedClassName, version: encodedVersion, updatedSchedule });
  };
  

  return {
    routines,
    loading,
    refetch,
    updateRoutine,
    isUpdating: updateRoutineMutation.isPending,
  };
};

export default useRoutine;
