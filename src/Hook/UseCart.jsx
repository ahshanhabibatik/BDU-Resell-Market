import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./AxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseCart = () => {
   // tank stack query

   const { user } = useContext(AuthContext);
   const axiosSecure = useAxiosSecure();

   const { refetch, data: cart = [] } = useQuery({
       queryKey: ['carts', user?.email],
       queryFn: async () => {
           const res = await axiosSecure.get(`/carts?email=${user.email}`)
           return res.data;
       }

   })
   return [cart, refetch];
};

export default UseCart;