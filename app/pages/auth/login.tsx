import {signIn} from 'next-auth/react'
import {useForm} from 'react-hook-form'
import router, {useRouter} from 'next/router'
import Google from 'next-auth/providers/google'
import { Head } from 'next/document';
import { title } from 'process';
import React from 'react';


interface LoginFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    // watch,
    formState: {errors}
  } = useForm<LoginFormInput>();


  const onSubmit = async (data:any) => {
    try{
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if(result?.ok){
        // redifect to home page
        router.push('/');
      }else{
        alert('Invalid credentials');
      }
    }catch(error){
      console.error('Sign in failed: ', error);
    }
  };

  const handleGoogleLogin = async () => {
    try{
      await signIn('google', {callbackUrl: '/'});
    }catch(error){
      console.error('Sign in failed: ', error);
    } 
  };

  const handleForgotPassword = async () => {
    router.push('/auth/forgot-password');
  }

  return (
    <>
        <Head>
            <title>Login</title>
            <meta name="description" content="Log in to your account with Google or email." />
        </Head>
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center">Login Here</h2>

            {/* Google Login */}
            <div className="mt-4">
                <button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                    onClick={handleGoogleLogin}
                    aria-label="Login with Google"
                >
                    Login with Google
                </button>
            </div>

            <div className="mt-6 text-center">Or log in with your email:</div>

            {/* Email/Password Login Form */}
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required.',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Enter a valid email address.',
                            },
                        })}
                        className={`w-full px-3 py-2 border rounded focus:outline-none ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{String(errors.email.message)}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', {
                            required: 'Password is required.',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters long.',
                            },
                        })}
                        className={`w-full px-3 py-2 border rounded focus:outline-none ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{String(errors.password.message)}</p>
                    )}
                </div>

                {/* Forgot Password */}
                <div className='flex justify-end'>
                    <button
                      type="button"
                      className="text-sm text-blue-500 hover:underline" 
                      onClick={handleForgotPassword}
                    >
                      Forgot Password?
                    </button>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </>
  );
};

export default Login;