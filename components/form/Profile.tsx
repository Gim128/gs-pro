'use client';
import React, { useEffect } from 'react';
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

const Profile = () => {

    const { updateUserProfile } = useStore(state => state);
    const userProfileSlice = useStore(state => state.userProfileSlice);

    useEffect(() => {
        useStore.persist?.rehydrate();
        const dob = userProfileSlice.currentUser.dob ? new Date(userProfileSlice.currentUser.dob) : undefined;
        form.reset({
            ...userProfileSlice.currentUser,
            dob: isNaN(dob?.getTime()) ? undefined : dob,
        });
    }, []);

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
        email: z.string().email("Invalid email format").refine(async (email) => {
            const validation = await validateEmail(email);
            return validation === true;  // returns true if valid, else string error message
        }, "Email is already in use or invalid"),
        phone_number: z.string().regex(/^\d{10,15}$/, "Invalid phone number").refine(async (phoneNumber) => {
            const validation = await validatePhoneNumber(phoneNumber);
            return validation === true;
        }, "Phone number is already in use or invalid"),
        password: z.string().optional(),
        district: z.string().min(1, "District is required"),
    });

    type UserProfileForm = z.infer<typeof UserProfileSchema>;

    const form = useForm<UserProfileForm>({
        resolver: zodResolver(UserProfileSchema),
        defaultValues: {
            id: userProfileSlice.currentUser.id,
            username: userProfileSlice.currentUser.username,
            firstname: userProfileSlice.currentUser.firstname,
            lastname: userProfileSlice.currentUser.lastname,
            user_type_id: userProfileSlice.currentUser.user_type_id,
            dob: new Date(userProfileSlice.currentUser.dob),
            email: userProfileSlice.currentUser.email,
            phone_number: userProfileSlice.currentUser.phone_number,
            password: "",
            district: ""
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
                        <FormField control={form.control} name="district" render={({ field }) => (
                            <FormItem>
                                <FormLabel>District</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

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
