import {signIn} from 'next-auth/react'
import Google from 'next-auth/providers/google'

const login = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold">Login Here</h2>
      <div className='mt-4'>
        <button className="w-full bg-blue-500 text-white py-2 rounded"
         onClick={() => signIn('google')}>
          Login with Google
        </button>
      </div>
      <div className="mt-4">
        <p>Or log in with email :</p>
        {/*Your email login here*/}
      </div>
    </div>
  )
}

export default login