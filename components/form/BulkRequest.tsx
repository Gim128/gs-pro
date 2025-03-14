'use client'
import React, {useEffect} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ClipLoader} from "react-spinners";
import {z} from "zod";
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {requestNewBulk} from "@/app/actions/outlet-actions";
import {ToastAction} from "@/components/ui/toast";
import {toast} from "@/hooks/use-toast";
import {useStore} from "@/lib/store";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar"
import {Textarea} from "@/components/ui/textarea";

const BulkRequest = () => {

    const outletManagerSlice = useStore(state => state.outletManagerSlice)

    useEffect(() => {
        useStore.persist?.rehydrate()
    }, [])

    const NewBulkRequestSchema = z.object({
        outletId: z.number(),
        userId: z.number(),
        quantity: z.number({message: "quantity is required"}),
        description: z.string().optional(),
        deliveryScheduledDate: z.date(),
        status: z.string()
    });
    type newOutletForm = z.infer<typeof NewBulkRequestSchema>;
    const form = useForm<newOutletForm>({
        resolver: zodResolver(NewBulkRequestSchema),
        defaultValues: {
            outletId: outletManagerSlice.selectedOutlet.id,
            userId: outletManagerSlice.currentUserId,
            quantity: 100,
            description: "",
            deliveryScheduledDate:new Date(new Date().setDate(new Date().getDate() + 1)),
            status: 'Pending'
        },
    });

    useStore.persist.onFinishHydration((state) => {
        form.setValue("outletId", state.outletManagerSlice.selectedOutlet.id)
        form.setValue("userId", state.outletManagerSlice.currentUserId)
    })

    const handleSubmit = async (data: FieldValues) => {
        try {
            await requestNewBulk(data);
            toast({
                variant: "default",
                title: "Awesome! Everything worked perfectly!",
                description: "Your request has been recorded successfully"
            })
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with requesting new bulk.",
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
                                name="quantity"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Quantity of the bulk</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field}
                                                   onChange={(e) => field.onChange(Number(e.target.value))}/>
                                        </FormControl>
                                        <FormMessage className='text-xs'/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
                            <FormField
                                control={form.control}
                                name="deliveryScheduledDate"
                                render={({field}) => (
                                    <FormItem className="flex flex-col space-y-3.5">
                                        <FormLabel>Delivery Scheduled Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[288px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='col-span-3'>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell head office a little bit about your request"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
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
