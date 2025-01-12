import {useForm, SubmitHandler} from 'react-hook-form';
import {useRouter} from 'next/router';
import Head from 'next/head';

interface ForgetPasswordFormInput {
    newPassword: string;
    confirmPassword: string;
}

const ForgotPassword:React.FC = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<ForgetPasswordFormInput>();

    const onSubmit: SubmitHandler<ForgetPasswordFormInput> = async (data) => {
        try{
            // API call to reset password
            console.log('New Password: ', data.newPassword);
            alert('Password reset successfully! Please login with your new password.');

            router.push('/auth/login');
        } catch(error){
            console.error('Password reset failed: ', error);
            alert('An error occurred while resetting the password. Please try again.');
        }
    };

    return(
        <>
            <Head>
                <title>Forgot Password</title>
                <meta name="description" content="Reset your password here." />
            </Head>

            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md mt-10">
                <h2 className="text-2xl fonty-bold text-center">Reset Your Password</h2>
                <p className="text-center text-gray-600 mt-2">Enter & Confirm Your New Password</p>

                <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input id="newPassword"
                             type="password"
                             {...register('newPassword', {
                                required: 'New password is required.',
                                minLength: {
                                    value: 8, 
                                    message: 'Password must be at least 8 characters long.'
                                },
                             })}
                             className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                             placeholder="Enter your new password"
                         />
                         {errors.newPassword && (
                            <p>{errors.newPassword.message}</p>
                         )}
                    </div>

                    <div>
                         <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Re entetr New Password </label>
                         <input 
                            id="confirmPassword" 
                            type="password"
                            {...register('confirmPassword', {
                                required: 'Confirm password is required.',
                                validate: (value) => value === watch('newPassword') || 'Passwords do not match.',
                            })}
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Re-enter your new password"
                         />
                         {errors.confirmPassword && (
                             <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                         )}
                    </div>

                    {/* submit */}
                    <div>
                        <button
                         type="submit"
                         className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;