'use client';
import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import { validateEmail, validatePhoneNumber } from "@/app/api/validation"; // Import validation functions
import { jwtDecode } from 'jwt-decode';
import { useSession } from 'next-auth/react';
import { getEmployee } from '@/app/actions/employee-actions';
import { format } from 'date-fns';
import { fetchAllDistricts } from '@/app/actions/outlet-actions';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Command } from 'lucide-react';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';


const Profile = () => {

    const { updateUserProfile } = useStore(state => state);
    const userProfileSlice = useStore(state => state.userProfileSlice);
    const { data: session, update } = useSession();
    const [districts, setDistricts] = useState<{ label: string; value: string }[]>([]);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (session) {
            let decodedToken = jwtDecode(session?.accessToken);
            getEmp(decodedToken.userId);
            void getAllDistricts();
        }
    }, [session]);

    // useEffect(() => {
    //     useStore.persist?.rehydrate();
    //     const dob = userProfileSlice.currentUser.dob ? new Date(userProfileSlice.currentUser.dob) : undefined;
    //     form.reset({
    //         ...userProfileSlice.currentUser,
    //         dob: isNaN(dob?.getTime()) ? undefined : dob,
    //     });
    // }, []);

    const getEmp = async (id: number) => {
        try {
            const res = await getEmployee(id);
            console.log(res);
            setUser(res);
            form.setValue("username", res?.username);
            form.setValue("firstname", res?.firstname);
            form.setValue("lastname", res?.lastname);
            form.setValue("email", res?.email);
            form.setValue("phone_number", res?.phone_number);
            form.setValue("password", res?.password);
            form.setValue("district", res?.district_id ?? "");

        } catch (error) {
            console.log(error);

        }

    }

    const getAllDistricts = async () => {
        try {
            const result = await fetchAllDistricts(); // Ensure result is an array of {label, value}
            setDistricts(result.map((d: any) => ({ label: d.name, value: d.id }))); // Transform API response
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with fetching districts.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    };

    const UserProfileSchema = z.object({
        id: z.number().optional(),
        username: z.string().min(3, "Username is required"),
        firstname: z.string().min(1, "First name is required"),
        lastname: z.string().min(1, "Last name is required"),
        user_type_id: z.number(),
        dob: z.preprocess(
            (arg) => (typeof arg === "string" ? new Date(arg) : arg),
            z.date().refine((date) => !isNaN(date.getTime()), "Invalid date")
        ),
        email: z.string().email("Invalid email format"),
        phone_number: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
        password: z.string().optional(),
        district: z.string().min(1, "District is required"),
    });

    type UserProfileForm = z.infer<typeof UserProfileSchema>;

    const form = useForm<UserProfileForm>({
        resolver: zodResolver(UserProfileSchema),
        defaultValues: {
            id: user?.id,
            username: user?.username,
            firstname: user?.firstname,
            lastname: user?.lastname,
            user_type_id: user?.user_type_id,
            dob: new Date(user?.dob),
            email: user?.email,
            phone_number: user?.phone_number,
            password: "",
            districtId: user?.district_id ?? ""
        }
    });

    const handleSubmit = async (data: FieldValues) => {
        try {
            let updatedDob = data.dob ? new Date(data.dob) : null;
            if (isNaN(updatedDob.getTime())) updatedDob = null; // handle invalid date
            const updatedProfile = {
                ...data,
                dob: updatedDob ? updatedDob.toISOString().split("T")[0] : "", // Ensure it's a valid string
            };
            // Update the profile using EmployeeRegistration service
            await updateUserProfile(updatedProfile);
            toast({ variant: "default", title: "Profile updated successfully!" });
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Error updating profile",
                description: "Something went wrong while updating your profile.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid gap-6">
                    <div className='grid grid-cols-3 gap-2'>
                        <FormField control={form.control} name="username" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="firstname" render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="lastname" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="phone_number" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="date"
                                            value={field.value && !isNaN(new Date(field.value).getTime()) ? format(new Date(field.value), "yyyy-MM-dd") : ""}
                                            onChange={(e) => {
                                                const selectedDate = new Date(e.target.value);
                                                field.onChange(isNaN(selectedDate.getTime()) ? null : selectedDate);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} placeholder="Leave blank to keep current password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField
                            control={form.control}
                            name="districtId"
                            render={({ field }) => (
                                <FormItem className="flex flex-col space-y-3.5">
                                    <FormLabel>District</FormLabel>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "justify-between",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? districts.find((district) => district.value === field.value)?.label
                                                        : "Select district"}
                                                    <ChevronsUpDown className="opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                                            <Command>
                                                <CommandInput placeholder="Search district..." className="h-9" />
                                                <CommandList>
                                                    {districts.length === 0 ? (
                                                        <CommandEmpty>No districts found.</CommandEmpty>
                                                    ) : (
                                                        <CommandGroup>
                                                            {districts.map((district) => (
                                                                <CommandItem
                                                                    value={district.label}
                                                                    key={district.value}
                                                                    onSelect={() => {
                                                                        console.log("on select fired")
                                                                        form.setValue("districtId", district.value);
                                                                        form.trigger(["districtId"])
                                                                        setOpen(false)
                                                                    }}
                                                                >
                                                                    {district.label}
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto",
                                                                            district.value === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    )}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage className='text-xs' />
                                </FormItem>
                            )}
                        />

                    </div>

                    <div className='flex justify-end gap-3 col-span-2'>
                        <Button type="reset" className="w-1/6" onClick={() => form.reset()} variant={'destructive'} size={'sm'}>
                            Reset
                        </Button>
                        <Button type="submit" className="w-1/6" size={'sm'} disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (<ClipLoader size={20} color="#fff" />) : ("Update")}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default Profile;
