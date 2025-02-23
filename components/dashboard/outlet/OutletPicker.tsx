'use client'
import React, {useEffect, useState} from 'react';
import {UserOutlet} from "@/types/Types";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";
import {useStore} from "@/lib/store";
import {useSession} from "next-auth/react";
import {jwtDecode} from "jwt-decode";

const OutletPicker = ({outlets}: { outlets: UserOutlet[] }) => {

    const previousSelectedOutlet = useStore(state => state.outletManagerSlice.selectedOutlet)
    const updateSelectedOutletOnState = useStore(state => state.updateSelectedOutlet)
    const updateCurrentUserId = useStore(state => state.updateCurrentUserId)

    const [open, setOpen] = useState(false);
    const [selectedOutlet, setSelectedOutlet] = useState<UserOutlet>(
        previousSelectedOutlet.id !== -1 ? previousSelectedOutlet : outlets[0]
    );

    const {data: session, update} = useSession();

    useEffect(() => {
        if (session) {
            let decodedToken = jwtDecode(session?.accessToken);
            updateCurrentUserId(decodedToken.userId);
        }
    }, [session]);

    useEffect(() => {
        useStore.persist?.rehydrate()
        updateSelectedOutletOnState(selectedOutlet)
    }, []);

    function updateSelectedOutlet(outlet: UserOutlet) {
        setSelectedOutlet(outlet);
        updateSelectedOutletOnState(outlet);
    }

    useStore.persist.onFinishHydration((state) => {
        setSelectedOutlet(prevState => ({
            ...prevState,
            ...state.outletManagerSlice.selectedOutlet
        }))
    })

    return (
        <div className='relative grid grid-cols-2 w-full text-lg items-center z-50 '>
            <p className='col-span-2 md:col-span-1 bg-white w-fit px-2 py-2'>You are currently working in <span
                className='font-bold text-xl'>{selectedOutlet?.name}</span> in <span
                className='font-bold text-xl'>{selectedOutlet?.district}</span> district</p>
            <div className='col-span-2 md:col-span-1 flex justify-end '>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className='min-w-[250px]'>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                "justify-between",
                                !selectedOutlet?.name && "text-muted-foreground"
                            )}
                        >
                            {selectedOutlet?.name
                                ? outlets.find((outlet) => outlet.id === selectedOutlet?.id)?.name
                                : "Select outlet"}
                            <ChevronsUpDown className="opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[--radix-popover-trigger-width] ">
                        <Command>
                            <CommandInput placeholder="Search Outlet..." className="h-9"/>
                            <CommandList>
                                {outlets.length === 0 ? (
                                    <CommandEmpty>No Outlets found.</CommandEmpty>
                                ) : (
                                    <CommandGroup>
                                        {outlets.map((outlet) => (
                                            <CommandItem
                                                value={outlet.name}
                                                key={outlet.id}
                                                onSelect={() => {
                                                    updateSelectedOutlet(outlet)
                                                    setOpen(false)
                                                }}
                                            >
                                                {outlet.name}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        outlet.id === selectedOutlet?.id
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
        </div>

    );
};

export default OutletPicker;
