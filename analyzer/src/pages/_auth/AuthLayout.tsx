import { Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function AuthLayout() {
  const navigate = useNavigate()
  const { data: authUser} = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
        try {
            const res = await fetch("/backend/auth/me");
            const data = await res.json();
            if (data.error) return null;
            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }
            console.log("authUser is here:", data);
            return data;
        } catch (error) {
            throw new Error(error);
        }
    },
    retry: false,
});

  return (
    <>
      {authUser ? (
        navigate('/')
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10 text-white bg-black">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
}
