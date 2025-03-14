'use server';

import {signIn, signOut} from "@/auth";
import {SignUpFrom} from "@/types/Types";
import {AuthError} from "@auth/core/errors";


type SignInError = {
    message: string
};
export const doLogin = async (formData: FormData): Promise<SignInError> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(formData, 'this is form data')
            const username = formData.get("username");
            const password = formData.get("password");
            await signIn("credentials", {
                redirect: false,
                email: username,
                password: password
            });
            resolve({message: 'Successfully authenticated'});
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.code) {
                    case 403: {
                        reject(error.message)
                        break;
                    }
                    default:
                        reject(error.message);
                        return;
                }
            }
            reject("Something went wrong, please try again!")
        }
    })
};

export const doRegister = async (data: SignUpFrom) => {
    return new Promise(async (resolve, reject) => {
        try {
            const uri = `${process.env.API_SERVER_BASE_URL}/api/v1/auth/register`;
            console.log(uri)
            const payload = {
                ...data
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

export async function doLogout() {
    await signOut({redirectTo: "/"});
}

/*export const doValidation = async (data: string, code: V_CODE) => {
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
}*/

