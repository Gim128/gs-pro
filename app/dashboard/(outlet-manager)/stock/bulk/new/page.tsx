import React from 'react';
import {cn} from "@/lib/utils";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import BulkRequest from "@/components/form/BulkRequest";

const Page = () => {
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card className='bg-white/95'>
                <CardHeader className="">
                    <CardTitle className="text-xl">Request New Bulk</CardTitle>
                    <CardDescription>
                        Ask from the Head Office for next bulk
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BulkRequest/>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
