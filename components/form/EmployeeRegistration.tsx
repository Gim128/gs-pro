'use client'
import React, {useRef} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {toast} from 'react-toastify';
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {ClipLoader} from "react-spinners";
import {doRegister} from "@/app/actions/auth-actions";
import * as z from "zod";


const EmployeeRegistration = () => {
    const lastCheckedEmailRef = useRef<string | null>(null);
    const lastCheckedPhoneRef = useRef<string | null>(null);

    const signUpSchema = z.object({
        firstName: z.string().trim().min(1, {message: "First Name must be at least 1 character long"})
            .max(20, {message: "First Name must be at most 20 characters long"}),
        lastName: z.string().trim().min(1, {message: "Last Name must be at least 1 character long"})
            .max(20, {message: "Last Name must be at most 20 characters long"}),
        email: z.string().email('Invalid Email address').refine(async (email) => {
            console.log(lastCheckedEmailRef.current, 'this is lastchecked email')
            console.log(email, "current email")
            const temp = lastCheckedEmailRef.current;
            lastCheckedEmailRef.current = email;
            const success = z.string().email().safeParse(email).success;
            if ((success && temp !== email && form.formState.isSubmitting) || (success && temp !== email)) {
                try {
                    const response = await fetch(`http://localhost:8080/gas-distro/api/v1/auth/validate-email?email=${email}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",

                        }
                    })
                    const parsedRes = await response.json();
                    console.log(parsedRes, 'this is par')
                    console.log(typeof parsedRes, parsedRes);
                    if (response.ok)
                        return true
                    if (response.status == 400)
                        return false

                } catch (e) {
                    console.log(e.message);
                    return false;
                }
            }
            return true;
        }, {
            message: "This email is already associated with an account"
        }),
        phoneNumber: z.string().regex(new RegExp("^(?:7|0|(?:\\+94))[0-9]{9,10}$"), {message: "invalid Phone Number"}).refine(async mobile => {
                console.log(lastCheckedPhoneRef.current, 'this is lastchecked phone')
                console.log(mobile, "current email")
                const temp = lastCheckedPhoneRef.current;
                lastCheckedPhoneRef.current = mobile;
                const success = z.string().regex(new RegExp("^(?:7|0|(?:\\+94))[0-9]{9,10}$")).safeParse(mobile).success;
                if ((success && temp !== mobile && form.formState.isSubmitting) || (success && temp !== mobile)) {
                    try {
                        const response = await fetch(`http://localhost:8080/gas-distro/api/v1/auth/validate-mobile?mobile=${mobile}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",

                            }
                        })
                        const parsedRes = await response.json();
                        console.log(parsedRes, 'this is par')
                        console.log(typeof parsedRes, parsedRes);
                        if (response.ok)
                            return true
                        if (response.status == 400)
                            return false

                    } catch (e) {
                        console.log(e.message);
                        return false;
                    }
                }

                return true;
                console.log('returend')
            },

            {
                message: "This phone number is already registered"
            }),
        password: z.string().min(8, {message: "Password must be at least 8 character long"}),
        confirmPassword: z.string()
    }).refine((data) => {
        return data.password === data.confirmPassword
    }, {
        message: "Passwords do not match",
        path: ['confirmPassword']
    });

    type SignUpFrom = z.infer<typeof signUpSchema>;

    const form = useForm<SignUpFrom>({
        resolver: zodResolver(signUpSchema),
        /*  reValidateMode:"onChange",
          mode:'onChange',*/
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: ""
        },
    });
    const router = useRouter();

    const handleSubmit = async (values: SignUpFrom) => {
        try {
            const response = await doRegister(values);
            toast.success("Account has been created successfully")
            router.push("/auth/login")
        } catch (e) {
            console.log(e, 'this is for register error')
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-2">
                        <div className='col-span-2 md:col-span-1'>
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-2 md:col-span-1'>
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-2 md:col-span-1'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field, fieldState}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-2 md:col-span-1'>
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({field, fieldState}) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-2 md:col-span-1'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-2 md:col-span-1'>
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full col-span-2 mt-4" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <ClipLoader size={20} color="#fff"/>
                            ) : (
                                "Create"
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default EmployeeRegistration;
