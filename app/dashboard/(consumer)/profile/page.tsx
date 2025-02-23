import BulkRequest from '@/components/form/BulkRequest';
import Profile from '@/components/form/Profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const Page = () => {
    return (
        <section>
            {/* <Card className='relative px-4 py-3 h-[30svh]  bg-ou_bannerImg bg-no-repeat' style={{
                backgroundPosition: "bottom right",
                backgroundSize: ' 100%'
            }}>
               
            </Card> */}
            <Card className='bg-white/95'>
                <CardHeader className="">
                    <CardTitle className="text-xl">User Profile</CardTitle>
                    <CardDescription>
                        Modify your account details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Profile/>
                </CardContent>
            </Card>
        </section>
    );
};

export default Page;
