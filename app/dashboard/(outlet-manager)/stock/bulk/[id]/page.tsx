import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "../../../../../../components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../../../../../../components/ui/table";
import {fetchAllEmployees} from "../../../../../actions/employee-actions";
import {getOutletBulkRequests} from "../../../../../actions/outlet-actions";
import {cn} from "../../../../../../lib/utils";
import BulkStatusPicker from "../../../../../../components/dashboard/outlet/BulkStatusPicker";
import {Button} from "../../../../../../components/ui/button";

const Page = async ({
                        params,
                    }: {
    params: Promise<{ id: string }>
}) => {
   const {id} = await params;

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
                    <TableBody>
                        {
                            !!requests && requests.map(request => (
                                <TableRow key={request.id}>
                                    <TableHead className="w-[50px]">{request.id}</TableHead>
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
                                    <TableCell className="w-[150px]">{
                                        request?.outlet_token_status_id ? "" :<Button size={"sm"} variant={"outline"}>add bulk token</Button>
                                    }</TableCell>
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
