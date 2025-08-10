import z from "zod";

export const signupSchema = z.object({
  name: z.string({
    error: "Name is required",
  }).min(2, "Name must be at least 2 characters"),
  username: z
    .string({
      error: "Username is required",
    })
    .regex(/^[a-z0-9_.]+$/, {
      message:
        "Username can only contain lowercase letters, numbers, dots and underscores",
    }),
  email: z
    .string({
      error: "Email is required",
    })
    .email("Invalid email address"),
  password: z.string({
    error: "Password is required",
  }),
});
