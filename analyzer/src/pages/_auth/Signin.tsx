import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SigninValidation } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/shared/Loader";
import { toast } from "sonner"

import { useMutation, useQueryClient } from "@tanstack/react-query";

function Signin() {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			username: "",
			password: "",
		},
	});
	const queryClient = useQueryClient();

	const {
		mutate: loginMutation,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: async ({ username, password }) => {
			try {
				const res = await fetch("/backend/auth/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ username, password }),
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
		},
		onSuccess: () => {
			// refetch the authUser
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			toast("Successfully Logged in!")
		},
	});

	const handleSubmit = () => {
		loginMutation(form.control._formValues);
	};
	return (
		<Form {...form}>

			<div className="sm:w-420 flex-center flex-col min-h-screen flex justify-center items-center">
				<h1 className='text-3xl'>TokenView</h1>

				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Log in to your account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2">
					Welcome back! Please enter your details.
				</p>
				<form className='flex flex-col gap-5 w-full mt-4' onSubmit={form.handleSubmit(handleSubmit)}>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Username</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} autoComplete="off" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Password</FormLabel>
								<FormControl>
									<Input type="password" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="shad-button_primary">
						{isPending ? (
							<div className="flex-center gap-2">
								<Loader />
							</div>
						) : "Login"}
					</Button>
				</form>
				<p className="text-small-regular text-light-2 text-center mt-2">
					Don&apos;t have an account?
					<Link
						to="/sign-up"
						className="text-primary-500 text-small-semibold ml-1">
						Sign up
					</Link>
				</p>
			</div>
		</Form>
	)
}

export default Signin
