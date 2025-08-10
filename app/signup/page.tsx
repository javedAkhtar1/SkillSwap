"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { signupSchema } from "@/zod/schemas";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

type SignUpFormData = z.infer<typeof signupSchema>;

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: SignUpFormData) {
    console.log(values);
  }

  return (
    <>
      <div className="flex flex-col gap-3 min-h-screen justify-center items-center bg-gradient-to-tr from-[#FAF9F6] to-blue-100">
        <Card className="w-[650px] h-auto my-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-poppins">
              Create an <span className="text-blue-800">Account</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-nunito text-lg">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-10"
                            placeholder="name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-nunito text-lg">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-10"
                            placeholder="username"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-nunito text-lg">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          placeholder="email@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-nunito text-lg">
                        Password
                      </FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            className="h-10 pr-10"
                            placeholder="••••••"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-10 font-nunito text-lg bg-primary-btn hover:bg-primary-btn-hover hover:text-black cursor-pointer"
                >
                  Create Account
                </Button>
              </form>
            </Form>
            <div>
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-400 font-inter text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <Button
                variant={"outline"}
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full h-10 font-nunito text-lg bg-gray-100 border-[.5px] border-gray-400 hover:bg-primary-btn-hover text-black cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">
                  <FcGoogle className="h-8 w-8" />
                  <p> Continue with Google</p>
                </div>
              </Button>
            </div>
            <div className="flex justify-center mt-5 gap-2">
              <h2>Already have an account?</h2>
              <Link
                href="/login"
                className="font-semibold underline text-blue-800 hover:text-blue-600"
              >
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignUpPage;
