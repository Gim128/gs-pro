import { signIn } from "next-auth/react";

const GoogleAuth = ({type} : {type: 'login' | 'signup'}) => {
    return (
        <button className="w-full bg-blue-500 text-white py-2 rounded"
            onClick={() => signIn('google')}>
                {type === 'signup' ? 'Sign Up' : 'Login'}
        </button>
    )
}

export default GoogleAuth