'use client'
import React, {useEffect} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ClipLoader} from "react-spinners";
import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createNewOutlet} from "@/app/actions/outlet-actions";
import {ToastAction} from "@/components/ui/toast";
import {toast} from "@/hooks/use-toast";
import {useStore} from "@/lib/store";

const BulkRequest = () => {

    const outletManagerSlice= useStore(state => state.outletManagerSlice)
    console.log(outletManagerSlice,'this is the outletManager Slice')

    useEffect(()=>{
        useStore.persist?.rehydrate()
    },[])

    const NewBulkRequestSchema = z.object({
        districtId: z.number({message: 'District is required'}),
        name: z.string().nonempty("Name is required"),
        address: z.string().nonempty("Address is required"),
        contactNo: z.string().nonempty("Contact Number is required").regex(new RegExp("^(?:7|0|(?:\\+94))[0-9]{9,10}$"), {message: "invalid Phone Number"}),
        capacity: z.string()
    });
    type newOutletForm = z.infer<typeof NewBulkRequestSchema>;
    const form = useForm<newOutletForm>({
        resolver: zodResolver(NewBulkRequestSchema),
        defaultValues: {
            districtId: "",
            name: "",
            address: "",
            contactNo: "",
            capacity: "50"
        },
    });

    const handleSubmit = async (data: FieldValues) => {
        let payload = {...data}

        try {
            await createNewOutlet(payload);
            toast({
                variant: "default",
                title: "Awesome! Everything worked perfectly!",
                description: "New outlet has been created successfully"
            })
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with creating outlet.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
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
                        {/*            <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                            <FormField
                                control={form.control}
                                name="districtId"
                                render={({field}) => (
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
                        </div>*/}
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
                            <Button type="reset" className="w-1/2 md:w-1/12 self-end col-span-2 mt-4"
                                    onClick={() => form.reset()}
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

export default BulkRequest;
