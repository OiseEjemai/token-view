import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(30, {message: "Name must be less than 30 characters."}),
    username: z.string().min(2, { message: "Username must be at least 2 characters." }).max(30, {message: "Username must be less than 30 characters."}),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});
export const EditProfileValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email(),
    currentPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
});
export const SigninValidation = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});