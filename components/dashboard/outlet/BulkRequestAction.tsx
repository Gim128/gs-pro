// File: app/dashboard/(outlet-manager)/stock/bulk/BulkRequestAction.tsx
'use client'
import React from 'react';
import {TableCell} from "../../ui/table";
import {addOutletTokenStatus} from "../../../app/actions/outlet-actions";
import {ToastAction} from "../../ui/toast";
import {Button} from "../../ui/button";
import {toast, useToast} from "../../../hooks/use-toast";

interface BulkRequestActionProps {
    request: {
        id: number;
        outlet_id: number;
        quantity: number;
        status: string;
        outlet_token_status_id?: number;
    };
}

const BulkRequestAction: React.FC<BulkRequestActionProps> = ({request, revalidatePath}) => {
    console.log(revalidatePath,'path on sub')
    const addTokenBulk = async (outlet_id: number, requestId: number, quantity: number) => {
        try {
            await addOutletTokenStatus(outlet_id, requestId, quantity,revalidatePath);
            toast({
                variant: "default",
                title: "Awesome! Everything worked perfectly!",
                description: "Your recode has been recorded successfully"
            });
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with adding a new recode.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        }
    };
if (request?.status === "Pending")
    return (
        <TableCell className="w-[150px]">
           <span className='text-accent-foreground/50 rounded bg-accent px-2 py-1'>Need Approval</span>
        </TableCell>
    );
if (request?.status === "Rejected")
    return (
        <TableCell className="w-[150px]">
            <span className='text-accent-foreground/50 rounded bg-accent px-2 py-1'>Rejected</span>
        </TableCell>
    );
if(request?.outlet_token_status_id)
    return (
        <TableCell className="w-[150px]">
            <span className='text-accent-foreground/50 rounded bg-accent px-2 py-1'>Serving</span>
        </TableCell>
    );
else
    return (
        <TableCell className="w-[150px]">{
                <Button  size={"custom"} variant={"outline"} onClick={() => addTokenBulk(request.outlet_id, request.id, request.quantity)}>Add Token Bulk</Button>
        }</TableCell>
    );
};

export default BulkRequestAction;
