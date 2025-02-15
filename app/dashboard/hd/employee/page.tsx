import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import React from "react";
import {fetchAllOutlets} from "@/app/actions/outlet-actions";
import {fetchAllEmployees} from "@/app/actions/employee-actions";

const Page = async () => {
    let employees;
    try {
        employees = await fetchAllEmployees();
    } catch (e) {

    }
    return (
        <Card className='bg-white/95'>
            <CardHeader className="">
                <CardTitle className="text-xl">Registered Employees</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of registered employees for available outlets</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Id</TableHead>
                            {/*<TableHead className="w-[50px]">District Id</TableHead>*/}
                            <TableHead >User Name</TableHead>
                            <TableHead>First Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>E mail</TableHead>
                            <TableHead>DOB</TableHead>
                            <TableHead>Mobile</TableHead>
                            <TableHead>Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            employees && employees.map(employee=>(
                                <TableRow key={employee.id}>
                                    <TableCell className="font-medium">{employee.id}</TableCell>
                                    {/*<TableCell>{employee.districtId}</TableCell>*/}
                                    <TableCell>{!!employee?.username ? employee.username : ''}</TableCell>
                                    <TableCell>{employee.firstname}</TableCell>
                                    <TableCell>{employee.lastname}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.dob}</TableCell>
                                    <TableCell>{employee.phone_number}</TableCell>
                                    <TableCell>{new Date(employee.created_at).toLocaleString()}</TableCell>
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
