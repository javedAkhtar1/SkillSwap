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
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from "@/zod/schemas";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/tanstack-query/mutation";

type LoginFormData = z.infer<typeof loginSchema>;
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLoginMutation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormData) {
    // console.log(values);
    mutate(values);
  }

  return (
    <>
      <div className="flex flex-col gap-3 min-h-screen justify-center items-center bg-gradient-to-tr from-[#FAF9F6] to-blue-100 sm:p-4 p-6">
        <Card className="w-full max-w-[550px]">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-poppins">
              Login to{" "}
              <Link href={"/"} className="hover:underline">
                <span className="text-blue-900">Skill</span>
                <span className="text-black">Swap</span>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          placeholder="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-md">Password</FormLabel>
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-10 text-lg bg-primary-btn hover:bg-primary-btn-hover hover:text-black cursor-pointer"
                >
                  {isPending ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
            <div>
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-400 font-inter text-sm">
                  OR
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <Button
                variant={"outline"}
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full h-10 text-lg bg-gray-100 border-[.5px] border-gray-400 hover:bg-primary-btn-hover text-black cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">
                  <FcGoogle className="h-6 w-6 md:h-8 md:w-8" />
                  <p className="text-sm md:text-base">Log in with Google</p>
                </div>
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-5 gap-1 sm:gap-2">
              <h2>Do not have an account?</h2>
              <Link
                href="/signup"
                className="font-semibold underline text-blue-800 hover:text-blue-600"
              >
                Signup
              </Link>
            </div>
            <div className="flex justify-center items-center mt-1">
              <Link
                href="/"
                className="font-semibold text-sm underline text-blue-800 hover:text-blue-600"
              >
                Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
