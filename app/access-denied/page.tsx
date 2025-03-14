import React from 'react';
import {Card} from "@/components/ui/card";
import {ShieldAlert} from "lucide-react";

const Page = () => {
    return (
        <div className='h-svh flex flex-col justify-center items-center gap-3'>
            <Card className='px-2 py-1 shadow-gray-600'>
                <div className='flex gap-2'>
                    <ShieldAlert/>
                    <label className='font-normal'>Access Denied</label>
                </div>

            </Card>
            <div className='flex items-center flex-col'>
                <p className='text-xs'>It seems you don’t have the necessary permissions to view this page.</p>
                <p className='text-xs'>Please reach out to your administrator for further assistance.</p>
            </div>
        </div>

    );
};

export default Page;
