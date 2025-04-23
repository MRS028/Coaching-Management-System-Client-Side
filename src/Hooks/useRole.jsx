import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useaxiosSecure";


const useSingleUser = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: singleUser, isPending: roleLoading } = useQuery({
    queryKey: [user?.email, "singleUser"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      // console.log(res.data)
      return res.data; 
    },
  });

  return { singleUser, roleLoading };
};

export default useSingleUser;
