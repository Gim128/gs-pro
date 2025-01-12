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
        </>
    )
}