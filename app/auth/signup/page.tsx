import React from 'react';
import {SignupForm} from "@/components/signup-form";
import {GalleryVerticalEnd} from "lucide-react";

const SignUp = () => {
    return (
        <div className="flex w-full max-w-lg flex-col gap-6">
            <a href="#" className="flex items-center gap-2 self-center font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <GalleryVerticalEnd className="size-4"/>
                </div>
                GasDistro Inc.
            </a>
            <SignupForm/>
        </div>

    );
};

export default SignUp;
