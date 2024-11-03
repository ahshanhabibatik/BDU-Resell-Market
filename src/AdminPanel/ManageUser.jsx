import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../Hook/AxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import "../GoogleFont/fonts.css";

const ManageUser = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Select Role",
            html: `
                <select id="role" class="swal2-input">
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: "Set Role",
            preConfirm: () => {
                const selectedRole = document.getElementById('role').value;
                return selectedRole;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedRole = result.value;
                if (selectedRole) {
                    axiosSecure.patch(`/users/role/${user._id}`, { role: selectedRole })
                        .then((res) => {
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.name} is now a ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}!`,
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                            }
                        })
                        .catch((error) => {
                            console.error("Error updating user role:", error);
                        });
                }
            }
        });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        refetch();
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "User has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="container mx-auto md:px-4 py-8 inter">
            <div className="flex justify-end mb-6">
                <h2 className="text-2xl text-gray-600 font-bold">Total Users: {users.length}</h2>
            </div>

            <div className=" rounded-lg shadow-lg border border-gray-200">
                <table className="min-w-full bg-white table-auto">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-2">SL</th>
                            <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-2">Name</th>
                            <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-2">Email</th>
                            <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-2">Role</th>
                            <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users.map((user, index) => (
                            <tr className="border-b hover:bg-gray-100" key={user._id}>
                                <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{user.name}</td>
                                <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2">{user.email}</td>
                                <td className=" px-2 py-1 md:px-4 md:py-2 flex justify-center">
                                    {user.Role === "user" ? (
                                        <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn bg-orange-400 text-white px-2 py-1 rounded shadow">
                                            Select Role
                                        </button>
                                    ) : (
                                        <span className="font-semibold">{user.Role}</span>
                                    )}
                                </td>
                                <td className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-center">
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost text-red-500 hover:bg-red-100 rounded-full">
                                        <FaTrash className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
