import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "../../../../../../components/ui/card";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../../../../../../components/ui/table";
import {addOutletTokenStatus, getOutletBulkRequests} from "../../../../../actions/outlet-actions";
import {cn} from "../../../../../../lib/utils";
import {Button} from "../../../../../../components/ui/button";
import {toast} from "../../../../../../hooks/use-toast";
import {ToastAction} from "../../../../../../components/ui/toast";
import BulkRequestAction from "../../../../../../components/dashboard/outlet/BulkRequestAction";
import {headers} from "next/headers";

const Page = async ({
                        params,
                    }: {
    params: Promise<{ id: string }>
}) => {
    const headersList = await headers();
    const fullUrl = headersList.get('referer') || "";
    const {id} = await params;
    const url = new URL(fullUrl);
    const path = url.pathname;
    let requests;
    try {
        requests = await getOutletBulkRequests(id);
        console.log(requests)
    } catch (e) {

    }


    return (
        <Card className='bg-white/95'>
            <CardHeader className="">
                <CardTitle className="text-xl">Bulk Requests From Your Outlet</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of bulk requests from your outlet</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Id</TableHead>
                            {/*<TableHead className="w-[50px]">District Id</TableHead>*/}
                            <TableHead>Scheduled Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Outlet</TableHead>
                            <TableHead>Created User</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className='flex justify-center items-center'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {
                            !!requests && requests.map(request => (
                                <TableRow key={request.id} className={'h-[65px]'}>
                                    <TableCell className="w-[50px]">{request.id}</TableCell>
                                    <TableCell
                                        className="font-medium">{new Date(request.delivery_scheduled_date).toLocaleString()}</TableCell>
                                    {/*<TableCell>{request.districtId}</TableCell>*/}
                                    <TableCell>{request?.description ? request?.description : 'NA'}</TableCell>
                                    <TableCell>{request.quantity}</TableCell>
                                    <TableCell><span className={cn('py-1 px-2 rounded bg-accent', {
                                        'bg-accent': request.status == 'Pending',
                                        'bg-green-100': request.status == 'Approved',
                                        'bg-blue-100': request.status == 'Confirmed',
                                        'bg-destructive/25 ': request.status == 'Rejected'

                                    })}>{request.status}</span></TableCell>
                                    <TableCell>{request.outlet_name}</TableCell>
                                    <TableCell>{request.created_user}</TableCell>
                                    <TableCell>{new Date(request.created_at).toLocaleString()}</TableCell>
                                    <BulkRequestAction request={request} revalidatePath={path}/>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default Page;
