import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"
import Loader from "../../components/shared/Loader";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupValidation } from "../../lib/validation";
import { Button } from "../../components/ui/button";

function Signup() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ name, username, email, password }) => {
			try {
				const res = await fetch("https://token-view.onrender.com/auth/signup", {
					mode: 'no-cors',
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, username, email, password }),
				});

				const data = await res.json();
				if (!res.ok) {
					toast(data.error);
					throw new Error(data.error || "Failed to create account");
				}
				if (isError) {
					toast(error?.message);
				}
				console.log(data);
				return data;
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		onSuccess: () => {
			{
				/* Added this line below, after recording the video. I forgot to add this while recording, sorry, thx. */
			}
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			toast("Successfully Signued Up")
			navigate('/')
		},
	});

	const handleSubmit = () => {
		mutate(form.control._formValues);
	};

  return (
    <Form {...form}>
			<div className="sm:w-420 flex-center flex-col min-h-screen flex justify-center items-center">
				<h1 className='text-3xl'>TokenView</h1>

				<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
					Create your account
				</h2>
				<p className="text-light-3 small-medium md:base-regular mt-2 w-96 text-center">
					Please enter your details.
				</p>
				<form className='flex flex-col gap-5 w-full mt-4' onSubmit={form.handleSubmit(handleSubmit)}>
				<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Name</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Username</FormLabel>
								<FormControl>
									<Input type="text" className="shad-input" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="shad-form_label">Email</FormLabel>
								<FormControl>
									<Input type="email" className="shad-input" {...field} />
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
						)  : "Sign Up"}
					</Button>
				</form>
				<p className="text-small-regular text-light-2 text-center mt-2">
					Already have an account?
					<Link
						to="/sign-in"
						className="text-primary-500 text-small-semibold ml-1">
						Sign in
					</Link>
				</p>
			</div>
		</Form>
  )
}

export default Signup
