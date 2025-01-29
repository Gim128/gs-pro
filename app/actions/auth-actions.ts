'use server';

import {signIn} from "@/auth";

export const doLogin =async (formData: FormData):Promise<string> => {
    return new Promise(async (resolve, reject):Promise<string> => {
        try {
            console.log(formData, 'this is form data')
            const username = formData.get("username");
            const password = formData.get("password");
            await signIn("credentials", {
                redirect: false,
                email: username,
                password: password
            });
            resolve("Successfull Authenticated");
        } catch (error) {
            if(error.code)
                reject(error.message);
            else
                reject("Something went wrong");
            console.log(error.message, ' hist is the error')
        }
    })
};
