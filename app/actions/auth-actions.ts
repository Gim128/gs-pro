'use server';

import {signIn} from "@/auth";
import {SignUpFrom} from "@/types/Types";
import {V_CODE} from "@/types/enum";

export const doLogin = async (formData: FormData): Promise<string> => {
    return new Promise(async (resolve, reject): Promise<string> => {
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
            if (error.code)
                reject(error.message);
            else
                reject("Something went wrong");
            console.log(error.message, ' hist is the error')
        }
    })
};

export const doRegister = async (data: SignUpFrom) => {
    return new Promise(async (resolve, reject) => {
        try {
            const uri = `${process.env.API_SERVER_BASE_URL}/api/v1/auth/register`;
            console.log(uri)
            const payload = {
                ...data,
                userRoles: [1]
            }
            delete payload.confirmPassword;
            console.log(payload, 'this is payload')
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            }
            const response = await fetch(uri, options);
            if (response.status == 202)
                resolve("Account has been created successfully")
            // const result = await response.json();
            // resolve(result);
        } catch (e) {
            reject(e.message);
        }
    })
}

/*export const doEmailValidation = async (email: string) => {
    return new Promise(async (resolve, reject) => {
            let url = `${process.env.API_SERVER_BASE_URL}/api/v1/auth/validate-email?email=${email}`
            console.log(url, 'this is url')
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const parsedRes = await response.json();
                console.log(parsedRes, 'this is par')
                console.log(typeof parsedRes, parsedRes);
                if (response.ok)
                    resolve(parsedRes)
                if (response.status == 400)
                    reject(new Error(parsedRes.message))

            } catch (e) {
                reject({
                    message: "unexpected error occurred",
                    data: {isTaken: true}
                })
                console.log(e.message);
            }
        }
    )
}*/

export const doValidation = async (data: string, code: V_CODE) => {
    return new Promise(async (resolve, reject) => {

            let current;
            switch (code) {
                case V_CODE.EMAIL: {
                    current = "email"
                    break;
                }
                case V_CODE.MOBILE: {
                    current = "mobile"
                    break;
                }
                default:
                    throw new Error("Unsupported code found")
            }

            let url = `${process.env.API_SERVER_BASE_URL}/api/v1/auth/validate-${current}?${current}=${data}`

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                const parsedRes = await response.json();
                console.log(parsedRes, 'this is par')
                console.log(typeof parsedRes, parsedRes);
                if (response.ok)
                    resolve(parsedRes)
                if (response.status == 400)
                    reject(new Error(parsedRes.message))

            } catch (e) {
                reject({
                    message: "unexpected error occurred",
                    data: {isTaken: true}
                })
                console.log(e.message);
            }
        }
    )
}

