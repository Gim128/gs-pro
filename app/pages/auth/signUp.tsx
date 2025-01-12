import {signIn} from "next-auth/react"
import { useForm } from "react-hook-form"
import Head from "next/head"

const signup = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password", "");

    const onSubmit = (data: any) => {
        console.log("FOrm data: ", data);
    }

    const handleGoogleSignUp = async () => {
        try {
            await signIn('google', {callbackUrl: '/'});
        } catch (error) {
            console.error("SIgn-in failed: ", error);
        }
    };


    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>

            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center"></h2>

                <div className="mt-4">
                    <button className="w-full bg-red-500 hover:bg=red-600 text-white py-2 rounded" 
                    onClick={handleGoogleSignUp}
                    aria-label="Sign up with Google"
                    >
                        Sign Up with google
                    </button>
                </div>

                <div className="mt-6 text-center">Or sign up with your email:</div>

                <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium" htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            {...register("firstName", {
                                required: "First name is required",
                                maxLength: {value: 20, message: "First name must be less than 20 characters"}
                            })}
                            className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.firstName ? "border-rfed-500" : "border-gray-300"}`}
                            placeholder="Enter First Name"
                            />
                            {errors.firstName && (
                                <p className="text-sm text-red-500">{String(errors.firstName.message)}</p>
                            )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium" htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            {...register("lastName", {
                                required: "Last name is required",
                                maxLength: {value: 20, message: "Last name must be less than 20 characters"}
                            })}
                            className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.lastName ? "border-rfed-500" : "border-gray-300"}`}
                            placeholder="Enter Last Name"
                            />
                            {errors.lastName?.message && (
                                <p className="text-sm text-red-500">{String(errors.lastName.message)}</p>
                            )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium" htmlFor="password">Passord</label>
                        <input id="password" type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {value: 8, message: "Password must be at least 8 characters"},
                        })}
                        className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Enter Password"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{String(errors.password.message)}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium" htmlFor="confirmPassword">COnfirm Passord</label>
                        <input id="confirmPassword" type="password"
                        {...register("password", {
                            required: "Confirm Password is required",
                            validate: (value: any) => value === password || "Password is not matched", 
                        })}
                        className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                        placeholder="COnfirm Your Password"
                        />
                            {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{String(errors.confirmPassword.message)}</p>
                        )}
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-blue-500 hover: bg-blue-600 text-white py-2 rounded">
                            SIgn Up
                        </button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default signup