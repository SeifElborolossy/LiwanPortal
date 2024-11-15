"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ThemeSwitcher from "../../components/ui/ThemeSwitcher"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Calendar, Link, List, User } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Textarea,
} from "@/components/ui/textarea"

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    employeeName: z.string().min(2, { message: "Employee name is required" }),
    customer: z.string().min(2, { message: "Customer name is required" }),
    price: z.string().min(1, { message: "Price is required" }),
    paymentMethod: z.string().min(1, { message: "Payment method is required" }),
    creationDate: z.string().min(1, { message: "Creation date is required" }),
    deliveryDate: z.string().min(1, { message: "Delivery date is required" }),
    description: z.string().min(1, { message: "Order description is required" }),
    attachments: z.string().optional(),
    priority: z.string().min(1, { message: "Priority is required" }),
    additionalNotes: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
    url: z.string().url({ message: "Invalid URL" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    message: z.string().optional(),
    selectValue: z.string().optional(),
    file: z.string().optional(),
  })
      export default function SubmitOrder() {
          const form = useForm({
              resolver: zodResolver(formSchema),
              defaultValues: {
                  username: "",
                  employeeName: "",
                  customer: "",
                  price: "",
                  paymentMethod: "",
                  creationDate: "",
                  deliveryDate: "",
                  description: "",
                  attachments: "",
                  priority: "",
                  additionalNotes: "",
                  email: "",
                  phoneNumber: "",
                  url: "",
                  password: "",
                  message: "",
                selectValue: "",
                file: "",
                },
          })
      
          function onSubmit(values) {
              console.log(values)
          }

        return (
        <>
            <ThemeSwitcher/>
            <div className="min-h-screen grid lg:grid-cols-2 grid-cols-1 bg-background text-foreground gap-4 px-4">
                <div className="flex items-start justify-center lg:justify-start lg:pl-14 py-8">
                    <Card className="w-full max-w-[350px] shadow-2xl dark:shadow-slate-800 rounded-xl">
                        <CardHeader>
                            <CardTitle>Order Checklist</CardTitle>
                            <CardDescription>
                                Navigate through the order page to submit a new order.
                            </CardDescription>
                            <CardContent>
                                <ul className="border-l-4 dark:border-gray-300 border-[#d4ab71] pl-2">
                                    <li className="hover:translate-x-2 transition-all duration-300 ease-in-out hover:dark:bg-blue-950/55 hover:bg-[#d4ab71] rounded-md p-2">
                                        <User className="inline-block mr-2 w-5 h-5" />
                                        <a href="#">Personal Information</a>
                                    </li>
                                    <li className="hover:translate-x-2 transition-all duration-300 ease-in-out hover:dark:bg-blue-950/55 hover:bg-[#d4ab71] rounded-md p-2">
                                        <Calendar className="inline-block mr-2 w-5 h-5" />
                                        <a href="#creationDate">Delivery Dates</a>
                                    </li>
                                    <li className="hover:translate-x-2 transition-all duration-300 ease-in-out hover:dark:bg-blue-950/55  hover:bg-[#d4ab71] rounded-md p-2">
                                        <List className="inline-block mr-2 w-5 h-5" />
                                        <a href="#description">Order Description</a>
                                    </li>
                                    <li className="hover:translate-x-2 transition-all duration-300 ease-in-out hover:dark:bg-blue-950/55  hover:bg-[#d4ab71] rounded-md p-2">
                                        <Link className="inline-block mr-2 w-5 h-5" />
                                        <a href="#attachments">Attachments</a>
                                    </li>
                                </ul>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
                <div className="flex items-start justify-center lg:justify-start py-8 px-4 lg:pr-14">
                <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 shadow-2xl p-6 lg:p-16 dark:shadow-slate-800 rounded-md w-full max-w-[700px]">
                            <FormField
                                control={form.control}
                                name="employeeName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Employee Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter employee name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customer"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Customer</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter customer name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter price" {...field} />
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
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="Enter phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                    <Input type="url" placeholder="Enter URL" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="creationDate"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Creation Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} id='creationDate' />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="deliveryDate"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>EST. Delivery Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Order Description</FormLabel>
                                <FormControl>
                                <Textarea 
                                            placeholder="Enter order description"
                                            className="min-h-[100px] resize-none"
                                            {...field}
                                            id='description'
                                        />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Your message"
                                            className="min-h-[100px] resize-none"
                                            {...field}
                                            id='attachments'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="selectValue"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Select</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Please select a value" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="option1">Option 1</SelectItem>
                                            <SelectItem value="option2">Option 2</SelectItem>
                                            <SelectItem value="option3">Option 3</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field: { onChange, ...field } }) => (
                                    <FormItem>
                                    <FormLabel>File Upload</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="file"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                onChange(file)
                                            }}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        <div className="flex justify-center lg:justify-start">
                            <button type='submit' className="rounded-md bg-[#d4ab71] px-10 py-2 dark:bg-blue-950/55 hover:opacity-90 transition-opacity">Submit</button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
        </>
      )
      }