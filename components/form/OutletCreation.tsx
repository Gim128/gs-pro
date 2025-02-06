'use client'
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {ClipLoader} from "react-spinners";
import React, {useEffect, useState} from "react";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {createNewOutlet, fetchAllDistricts} from "@/app/actions/outlet-actions";
import {toast} from "react-toastify";

const OutletCreation = () => {
    const [open, setOpen] = useState(false)
    const [districts, setDistricts] = useState<{ label: string; value: string }[]>([]);

    const getAllDistricts = async () => {
        try {
            const result = await fetchAllDistricts(); // Ensure result is an array of {label, value}
            setDistricts(result.map((d: any) => ({ label: d.name, value: d.district_id }))); // Transform API response
        } catch (e) {
            toast.error("Error fetching districts");
        }
    };


    useEffect(() => {
        getAllDistricts();
    }, []);


    const NewOutletSchema = z.object({
        districtId: z.number({message:'District is required'}),
        name: z.string().nonempty("Name is required"),
        address: z.string().nonempty("Address is required"),
        contactNo: z.string().nonempty("Contact Number is required").regex(new RegExp("^(?:7|0|(?:\\+94))[0-9]{9,10}$"), {message: "invalid Phone Number"}) ,
        capacity: z.number().min(1, "Capacity must be at least 1")
    });
    type newOutletForm = z.infer<typeof NewOutletSchema>;
    const form = useForm<newOutletForm>({
        resolver: zodResolver(NewOutletSchema),
        defaultValues: {
            districtId: "",
            name: "",
            address: "",
            contactNo: "",
            capacity: 50
        },
    });

    const handleSubmit = async (data :FieldValues) => {
        try {
           await createNewOutlet(data);
           toast.success("New outlet has been created successfully")
        } catch (e) {
            toast.error("Unable to create the outlet, please try again")
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="grid gap-6">
                    <div className="grid grid-cols-3 gap-2">
                        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Outlet Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
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
                                                        <ChevronsUpDown className="opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                                                <Command>
                                                    <CommandInput placeholder="Search district..." className="h-9"/>
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
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                            <FormField
                                control={form.control}
                                name="contactNo"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Contact Number</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                            <FormField
                                control={form.control}
                                name="capacity"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Capacity</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-3 flex justify-end gap-3'>
                            <Button type="reset" className="w-1/2 md:w-1/12 self-end col-span-2 mt-4" onClick={()=>form.reset()}
                                    variant={'destructive'} size={'sm'}>
                                Reset
                            </Button>
                            <Button type="submit" className="w-1/2 md:w-1/12 self-end col-span-2 mt-4" size={'sm'}
                                    disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? (
                                    <ClipLoader size={20} color="#fff"/>
                                ) : (
                                    "Create"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default OutletCreation;
