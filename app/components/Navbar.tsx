import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
    const {data: session} = useSession();

    return (
        <nav className='bg-blue-500 p-4'>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white text-xl">
                    <Link href='/'>GSPro</Link>
                </div>

                <div className="flex space-x-4">
                    <Link href='/'>Home</Link>
                    <Link href='/about'>About</Link>
                    <Link href='/services'>Services</Link>
                    <Link href='/stores'>Stores</Link>

                    {!session ? (
                        <>
                        <button onClick={() => signIn()} className="text-white">
                            Login
                        </button>

                        <Link href="/auth/signup">
                            <button className="text-white">Sign Up</button>
                        </Link>
                        </>
                    ) : (
                        <button onClick={() => signOut()} className="text-white">
                            Logout
                        </button>
                    )

                    }
                </div>

            </div>
        </nav>
    )
}

export default Navbar