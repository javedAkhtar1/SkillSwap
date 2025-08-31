// "use client";
// import React, { useState } from "react";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Eye, EyeOff, Upload } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const skills = [
//   "Web Development",
//   "Graphic Design",
//   "Guitar",
//   "Cooking",
//   "English",
//   "Chess",
//   "Yoga",
//   "Video Editing",
//   "Photography",
//   "App Development",
//   "UI/UX Design",
//   "Drawing",
//   "Singing",
//   "Dancing",
//   "Hindi",
// ];

// const signupSchema = z.object({
//   profilePicture: z.string().optional(),
//   name: z.string({
//     error: "Name is required",
//   }),
//   username: z
//     .string({
//       error: "Username is required",
//     })
//     .regex(/^[a-z0-9_.]+$/, {
//       message:
//         "Username can only contain lowercase letters, numbers, dots and underscores",
//     }),
//   email: z
//     .string({
//       error: "Email is required",
//     })
//     .email("Invalid email address"),
//   password: z
//     .string({
//       error: "Password is required",
//     })
//     .min(6, "Password must be at least 6 characters"),
//   age: z
//     .number({
//       error: "Age is required",
//     })
//     .min(16, "You must be at least 16 years old")
//     .max(120, "Please enter a valid age"),
//   bio: z.string().max(200, "Bio must be less than 200 characters").optional(),
//   skillsToTeach: z.array(z.string()).min(1, "Select at least one skill"),
//   skillsToLearn: z.array(z.string()).min(1, "Select at least one skill"),
// });

// type SignUpFormData = z.infer<typeof signupSchema>;

// function SignUpPage() {
//   const [showPassword, setShowPassword] = useState(false);

//   const form = useForm<SignUpFormData>({
//     resolver: zodResolver(signupSchema),
//     defaultValues: {
//       name: "",
//       username: "",
//       email: "",
//       age: 0,
//       password: "",
//       bio: "",
//       skillsToTeach: [],
//       skillsToLearn: [],
//     },
//   });

//   function onSubmit(values: SignUpFormData) {
//     console.log(values);
//   }

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         if (event.target?.result) {
//           form.setValue("profilePicture", event.target.result as string);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col gap-3 min-h-screen justify-center items-center bg-gradient-to-tr from-[#FAF9F6] to-blue-100">
//         <Card className="w-[650px] h-auto my-8">
//           <CardHeader>
//             <CardTitle className="text-2xl text-center font-poppins">
//               Create an <span className="text-blue-800">Account</span>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-6"
//               >
//                 {/* Profile Picture */}
//                 <div className="flex flex-col items-center mb-4">
//                   <label className="cursor-pointer flex flex-col items-center">
//                     <Avatar className="w-24 h-24 mb-2">
//                       <AvatarImage src={form.watch("profilePicture")} />
//                       <AvatarFallback>U</AvatarFallback>
//                     </Avatar>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                     <Upload className="h-4 w-4 text-gray-400" />
//                   </label>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Name */}
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="font-nunito text-lg">
//                           Full Name
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             className="h-10"
//                             placeholder="name"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   {/* Username */}
//                   <FormField
//                     control={form.control}
//                     name="username"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="font-nunito text-lg">
//                           Username
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             className="h-10"
//                             placeholder="username"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {/* Email */}
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="font-nunito text-lg">
//                         Email
//                       </FormLabel>
//                       <FormControl>
//                         <Input
//                           className="h-10"
//                           placeholder="email@example.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid grid-cols-2 gap-4">
//                   {/* Password */}
//                   <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="font-nunito text-lg">
//                           Password
//                         </FormLabel>
//                         <div className="relative">
//                           <FormControl>
//                             <Input
//                               type={showPassword ? "text" : "password"}
//                               className="h-10 pr-10"
//                               placeholder="••••••"
//                               {...field}
//                             />
//                           </FormControl>
//                           <button
//                             type="button"
//                             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                             onClick={() => setShowPassword(!showPassword)}
//                           >
//                             {showPassword ? (
//                               <EyeOff className="h-4 w-4" />
//                             ) : (
//                               <Eye className="h-4 w-4" />
//                             )}
//                           </button>
//                         </div>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   {/* Age */}
//                   <FormField
//                     control={form.control}
//                     name="age"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="font-nunito text-lg">
//                           Age
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             type="number"
//                             className="h-10"
//                             placeholder="18"
//                             {...field}
//                             onChange={(e) =>
//                               field.onChange(parseInt(e.target.value) || 0)
//                             }
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 {/* Bio */}
//                 <FormField
//                   control={form.control}
//                   name="bio"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="font-nunito text-lg">
//                         Bio (Optional)
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea
//                           className="min-h-[100px]"
//                           placeholder="Tell us about yourself..."
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {/* Skills You Can Teach */}
//                 <FormField
//                   control={form.control}
//                   name="skillsToTeach"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="font-nunito text-lg">
//                         Skills You Can Teach
//                       </FormLabel>
//                       <Select
//                         onValueChange={(value) => {
//                           const currentValues = field.value || [];
//                           if (!currentValues.includes(value)) {
//                             field.onChange([...currentValues, value]);
//                           }
//                         }}
//                       >
//                         <FormControl>
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select skills you can teach" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {skills.map((skill) => (
//                             <SelectItem key={skill} value={skill}>
//                               {skill}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <div className="flex flex-wrap gap-2 mt-2 max-h-[100px] overflow-auto">
//                         {field.value?.map((skill) => (
//                           <span
//                             key={skill}
//                             className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center"
//                           >
//                             {skill}
//                             <button
//                               type="button"
//                               className="ml-1 text-gray-500 hover:text-red-500"
//                               onClick={() => {
//                                 field.onChange(
//                                   field.value?.filter((s) => s !== skill)
//                                 );
//                               }}
//                             >
//                               ×
//                             </button>
//                           </span>
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="skillsToLearn"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="font-nunito text-lg">
//                         Skills You Want to Learn
//                       </FormLabel>
//                       <Select
//                         onValueChange={(value) => {
//                           const currentValues = field.value || [];
//                           if (!currentValues.includes(value)) {
//                             field.onChange([...currentValues, value]);
//                           }
//                         }}
//                       >
//                         <FormControl>
//                           <SelectTrigger className="w-full">
//                             <SelectValue placeholder="Select skills you want to learn" />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           {skills.map((skill) => (
//                             <SelectItem key={skill} value={skill}>
//                               {skill}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                       <div className="flex flex-wrap gap-2 mt-2 max-h-[100px] overflow-auto">
//                         {field.value?.map((skill) => (
//                           <span
//                             key={skill}
//                             className="bg-gray-100 px-2 py-1 rounded-full text-sm flex items-center"
//                           >
//                             {skill}
//                             <button
//                               type="button"
//                               className="ml-1 text-gray-500 hover:text-red-500"
//                               onClick={() => {
//                                 field.onChange(
//                                   field.value?.filter((s) => s !== skill)
//                                 );
//                               }}
//                             >
//                               ×
//                             </button>
//                           </span>
//                         ))}
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   type="submit"
//                   className="w-full h-10 font-nunito text-lg bg-primary-btn hover:bg-primary-btn-hover hover:text-black cursor-pointer"
//                 >
//                   Create Account
//                 </Button>
//               </form>
//             </Form>
//             <div className="flex justify-center mt-5 gap-2">
//               <h2>Already have an account?</h2>
//               <Link
//                 href="/login"
//                 className="font-semibold underline text-blue-800 hover:text-blue-600"
//               >
//                 Login
//               </Link>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </>
//   );
// }
// export default SignUpPage;

import React from "react";

function CompleteProfile() {
  return <div></div>;
}

export default CompleteProfile;
