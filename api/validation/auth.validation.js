import e from "express";
import z from "zod";

export const signinSchema = z.object({
    email : z.string("Email should be string").min(1, "Email is required").email("Invalid email format"),
    password : z.string("Password should be string").min(1, "Password is required")
})
