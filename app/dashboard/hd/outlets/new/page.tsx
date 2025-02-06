import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import OutletCreation from "@/components/form/OutletCreation";

const Page = () => {
    return (
        <div className={cn("flex flex-col gap-6")} >
            <Card className='bg-white/95'>
                <CardHeader className="">
                    <CardTitle className="text-xl">Create New Outlet</CardTitle>
                    <CardDescription>
                        Create Your Outlet Space
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OutletCreation/>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
