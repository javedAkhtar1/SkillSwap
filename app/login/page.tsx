"use client";
import React from "react";
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

const loginSchema = z.object({
  email: z
    .string({
      error: "Email is required",
    })
    .email("Invalid email address"),
  password: z.string({
    error: "Password is required",
  }),
});

type LoginFormData = z.infer<typeof loginSchema>;
function LoginPage() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormData) {
    console.log(values);
  }

  return (
    <>
      <div className="flex flex-col gap-3 min-h-screen justify-center items-center bg-gradient-to-tr from-[#FAF9F6] to-blue-100">
        <Card className="w-[550px] h-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-poppins">
              Login to <span className="text-blue-900">Skill</span>
              <span className="text-black">Swap</span>
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
                      <FormLabel className="font-nunito text-lg">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          placeholder="email"
                          {...field}
                        />
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
                      <FormLabel className="font-nunito text-lg">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10"
                          placeholder="••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-10 font-nunito text-lg bg-primary-btn hover:bg-primary-btn-hover hover:text-black cursor-pointer"
                >
                  Login
                </Button>
              </form>
            </Form>
            <div className="flex justify-center mt-5 gap-2">
              <h2>Do not have an account?</h2>
              <Link href="/signup" className="font-semibold underline text-blue-800 hover:text-blue-600">Signup</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LoginPage;
