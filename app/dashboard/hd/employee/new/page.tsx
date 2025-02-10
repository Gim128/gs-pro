import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import EmployeeRegistration from "@/components/form/EmployeeRegistration";

const Page = () => {
    return (
        <Card className='bg-white/95'>
            <CardHeader className="">
                <CardTitle className="text-xl">New Employee Registration</CardTitle>
                <CardDescription>
                    Create your new outlet user over here
                </CardDescription>
            </CardHeader>
            <CardContent>
                <EmployeeRegistration/>
            </CardContent>
        </Card>
    );
};

export default Page;
