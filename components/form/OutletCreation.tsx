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
import {Check, ChevronsUpDown, CircleX} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {createNewOutlet, fetchAllDistricts} from "@/app/actions/outlet-actions";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {fetchAllEmployees} from "@/app/actions/employee-actions";
import {ToastAction} from "@/components/ui/toast";
import {useToast} from "@/hooks/use-toast";

type Employee = {
    id: number
    firstname: string
    lastname: string
    outlet_id: number
    label?: string
    value?: string
}

function moveItemByValueImmutable(sourceArray:Employee[], targetArray:Employee[], value:number) {
    const index = sourceArray.findIndex(item => item.value === value);
    if (index === -1) return [sourceArray, targetArray]; // Return original if not found

    const newSource = [...sourceArray.slice(0, index), ...sourceArray.slice(index + 1)];
    const newTarget = [...targetArray, sourceArray[index]];

    return [newSource, newTarget];
}

const OutletCreation = () => {
    const {toast} = useToast();
    const [open, setOpen] = useState(false)
    const [openEmSelection, setOpenEmSelection] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
    const [districts, setDistricts] = useState<{ label: string; value: string }[]>([]);

    const getAllDistricts = async () => {
        try {
            const result = await fetchAllDistricts(); // Ensure result is an array of {label, value}
            setDistricts(result.map((d: any) => ({label: d.name, value: d.id}))); // Transform API response
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with fetching districts.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    };
    const getAllEmployees = async () => {
        try {
            const result = await fetchAllEmployees(); // Ensure result is an array of {label, value}
            setEmployees(result.map((e: Employee) => ({label: `${e.firstname}  ${e.lastname}`, value: e.id}))); // Transform API response
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with fetching employees.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    };

    useEffect(() => {
        void getAllDistricts();
        void getAllEmployees();
    }, []);


    const NewOutletSchema = z.object({
        districtId: z.number({message: 'District is required'}),
        name: z.string().nonempty("Name is required"),
        address: z.string().nonempty("Address is required"),
        contactNo: z.string().nonempty("Contact Number is required").regex(new RegExp("^(?:7|0|(?:\\+94))[0-9]{9,10}$"), {message: "invalid Phone Number"}),
        capacity: z.string()
    });
    type newOutletForm = z.infer<typeof NewOutletSchema>;
    const form = useForm<newOutletForm>({
        resolver: zodResolver(NewOutletSchema),
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
        if (selectedEmployees.length !== 0){
            payload = {
                ...payload,
                employees:[...selectedEmployees.map(em=>em.value)]
            }
        }
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
                        <div className='col-span-3 md:col-span-2 lg:col-span-1'>
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
                        <Card className='col-span-3 p-2 '>
                            <CardHeader className='space-y-1 p-1 text-sm'>
                                Select all employees belongs to this outlet
                            </CardHeader>
                            <CardContent className='p-0 mt-1 min-h-fit flex flex-wrap gap-2'>
                                {
                                    !!setSelectedEmployees && selectedEmployees.map(emp => (
                                        <div key={emp.value}
                                             className='relative px-3 py-2 text-sm h-fit rounded-lg border bg-card text-card-foreground shadow-sm '>
                                            <label>{emp.label}</label>
                                            <CircleX size={15}
                                                     className='opacity-40 absolute top-[-5] right-[-5] cursor-pointer hover:text-destructive hover:opacity-80'
                                                     onClick={() => {
                                                         const [newSource, newTarget] = moveItemByValueImmutable(selectedEmployees, employees, emp.value);
                                                         setEmployees(newTarget)
                                                         setSelectedEmployees(newSource)
                                                     }}/>
                                        </div>
                                    ))
                                }
                                <Popover open={openEmSelection} onOpenChange={setOpenEmSelection}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "justify-between"
                                                )}
                                            >
                                                select one of your employee
                                                <ChevronsUpDown className="opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
                                        <Command>
                                            <CommandInput placeholder="Search employee..." className="h-9"/>
                                            <CommandList>
                                                {employees.length === 0 ? (
                                                    <CommandEmpty>No employees found.</CommandEmpty>
                                                ) : (
                                                    <CommandGroup>
                                                        {employees.map((employee) => (
                                                            <CommandItem
                                                                value={employee.label}
                                                                key={employee.value}
                                                                onSelect={() => {
                                                                    let [newSource, newTarget] = moveItemByValueImmutable(employees, selectedEmployees, employee.value);
                                                                    setEmployees(newSource)
                                                                    setSelectedEmployees(newTarget);
                                                                    setOpenEmSelection(false)
                                                                }}
                                                            >
                                                                <div className='w-full flex justify-between'>
                                                                    <span>{employee.label}  </span>
                                                                    <span>{`[Id : ${employee.value}]`}</span>
                                                                </div>

                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                )}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </CardContent>
                        </Card>
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

export default OutletCreation;
