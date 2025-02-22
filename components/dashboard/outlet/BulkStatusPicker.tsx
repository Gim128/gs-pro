'use client'
import React, {useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {updateBulkRequestStatus} from "@/app/actions/outlet-actions";
import {useToast} from "@/hooks/use-toast";
import {revalidatePath} from "next/cache";
import {ToastAction} from "@/components/ui/toast";

type BulkStatusPickerProps = {
    request: { status: string, outlet_name: string }
}

const statuses = [
    {
        value: "Pending",
        label: "Pending",
    },
    {
        value: "Approved",
        label: "Approved",
    },
    {
        value: "Rejected",
        label: "Rejected",
    },
    {
        value: "Confirmed",
        label: "Confirmed",
    },
]

const BulkStatusPicker = ({request}: BulkStatusPickerProps) => {
    const {toast} = useToast()
    const [open, setOpen] = useState(false);
    const [mainOpen,setMainOpen] =useState(false)
    const [selectedStatus, setSelectedStatus] = useState<string>(request.status);

    const handleUpdate = async ()=>{
        try {
          await updateBulkRequestStatus({
                id: request.id,
                status: selectedStatus
            });
          setMainOpen(false);
            toast({
                variant: "default",
                title: "Success!",
                description: "Request status has been updated successfully",
            })
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with updating request status.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    return (
        <AlertDialog open={mainOpen} onOpenChange={setMainOpen}>
            <AlertDialogTrigger asChild>
                <Button size={"sm"} variant={"outline"} className='text-xs'>Change
                    Status</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='flex flex-col'>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <p>
                    {`You are going to change the status of the bulk request from ${request.outlet_name}`}
                </p>
                <div>
                    <Popover open={open} onOpenChange={setOpen} >
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "flex justify-between min-w-[250px]",
                                )}
                            >
                                {selectedStatus}
                                <ChevronsUpDown className="opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" style={{ pointerEvents: "auto" }}>
                            <Command>
                                <CommandInput placeholder="Search Available Statuses..." className="h-9"/>
                                <CommandList>
                                    {statuses.length === 0 ? (
                                        <CommandEmpty>No Status found.</CommandEmpty>
                                    ) : (
                                        <CommandGroup>
                                            {statuses.map((status) => (
                                                <CommandItem
                                                    value={status.value} // MUST match what you want to receive in onSelect
                                                    key={status.value}
                                                    onSelect={(currentValue) => { // This now gets status.value
                                                        console.log('Selected:', currentValue, 'Full status:', status)
                                                        setSelectedStatus(status.value)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {status.label}
                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            status.value === selectedStatus
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
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={()=>{handleUpdate()}}>Continue</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>



    );
};

export default BulkStatusPicker;
