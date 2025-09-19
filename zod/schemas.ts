import z from "zod";

export const signupSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .min(2, "Name must be at least 2 characters")
    .regex(/^(?!\s+$).*/, "Name cannot be only whitespace")
    .trim(),
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
  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string({
      error: "Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Invalid password"),
});

export const completeProfileSchema = z.object({
  profilePicture: z.string().optional(),
  age: z
      .number({ error: "Age is required" })
      .min(10, "Age must be at least 10")
      .max(100, "Age must be less than or equal to 100"),
  bio: z.string().max(200, "Bio must be less than 200 characters"),
  skillsToTeach: z.array(z.string()).min(1, "Select at least one skill"),
  skillsToLearn: z.array(z.string()).min(1, "Select at least one skill"),
});
