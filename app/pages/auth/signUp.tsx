import {signIn} from "next-auth/react"
import GoogleAuth from '../../components/GoogleAuth'
import exp from "constants"

const signup = () => {
    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-2xl font-bold">Sign Up Here</h2>
            <div className="mt-4">
                <button className="w-full bg-red-500 text-white py-2 rounded"
                    onClick={() => signIn('google')}>
                    Sign Up with Google
                </button>
            </div>

            <div className="mt-4">
                <p>Or Sign up with email :</p>
                {/*Your email signup here*/}
            </div>

        </div>
    )
}

export default signup