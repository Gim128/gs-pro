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
import {useToast} from "@/hooks/use-toast";
import {ToastAction} from "@/components/ui/toast";


const SignUp = () => {
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
        userType:z.number(),
        userRoles:z.array(z.number()),
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
            userType:1,
            userRoles:[3],
            password: "",
            confirmPassword: ""
        },
    });
    const router = useRouter();
    const {toast} = useToast();

    const handleSubmit = async (values: SignUpFrom) => {
        try {
            const response = await doRegister(values);
            toast({
                variant: "default",
                title: "Awesome! Everything worked perfectly!",
                description: "Account has been created successfully"
            })
            router.push("/auth/login")
        } catch (e) {
            console.log(e, 'this is for register error')
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid gap-6">
                    <div className="flex flex-col gap-4">
                        {/*    <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Login with Apple
                </Button>*/}
                        <Button type={"button"} variant="outline" className="w-full" size="sm"
                                onClick={() => toast({
                                    variant: "destructive",
                                    title: "Uh oh! Something went wrong.",
                                    description: "This feature is not supported yet",
                                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                                })}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Sign up with Google
                        </Button>
                    </div>
                    <div
                        className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
                    </div>
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
                                "Sign Up"
                            )}
                        </Button>
                    </div>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="underline underline-offset-4">
                            Sign In
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default SignUp;
