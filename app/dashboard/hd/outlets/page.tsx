import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import React from 'react';
import {fetchAllOutlets} from "@/app/actions/outlet-actions";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const Page = async () => {
    let outlets;
    try {
        outlets = await fetchAllOutlets();
    } catch (e) {

    }
    return (
            <Card className='bg-white/95'>
                <CardHeader className="">
                    <CardTitle className="text-xl">Registered Outlets</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of current available outlets</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Id</TableHead>
                                {/*<TableHead className="w-[50px]">District Id</TableHead>*/}
                                <TableHead >District</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Contact No</TableHead>
                                <TableHead>Capacity</TableHead>
                                <TableHead>Reserved</TableHead>
                                <TableHead>Available</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                !!outlets && outlets.map(outlet=>(
                                    <TableRow key={outlet.outletId}>
                                        <TableCell className="font-medium">{outlet.outletId}</TableCell>
                                        {/*<TableCell>{outlet.districtId}</TableCell>*/}
                                        <TableCell>{outlet.districtName}</TableCell>
                                        <TableCell>{outlet.name}</TableCell>
                                        <TableCell>{outlet.address}</TableCell>
                                        <TableCell>{outlet.contactNo}</TableCell>
                                        <TableCell>{outlet.capacity}</TableCell>
                                        <TableCell>{outlet.reservedCount}</TableCell>
                                        <TableCell>{outlet.availableCount}</TableCell>
                                        <TableCell>{new Date(outlet.createdAt).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(outlet.updatedAt).toLocaleString()}</TableCell>
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
