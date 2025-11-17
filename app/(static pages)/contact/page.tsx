"use client";
import React, { useState } from "react";
import { Mail, User } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.name.trim() === "" || form.email.trim() === "" || form.message.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    const mailto = `mailto:jved004@gmail.com?subject=Contact from Skillswap ${encodeURIComponent(
      form.name
    )}&body=${encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    )}`;

    window.location.href = mailto;
  };

  return (
    <div className="flex items-center justify-center py-18 px-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <CardTitle className="text-3xl">Contact Us</CardTitle>
          <CardDescription>
            Send us a message and we&apos;ll get back to you.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <div className="relative">
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background resize-none"
                  placeholder="Write your message..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button
              className="w-full cursor-pointer py-6 text-md bg-primary-btn hover:bg-primary-btn-hover hover:text-black"
              onClick={handleSubmit}
            >
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
