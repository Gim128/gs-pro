import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn} from "@/auth";
import React from 'react'

const Navbar = async () => {
    const session = await auth();

  return (
    <header className="px-4 py-3 bg-white shadow-sm font-work-sans">
        <nav className="flex justify-between items-center">
            <Link href="/">
                <Image src="..." alt="Logo" width={144} height={30} />
            </Link>

            <div className="flex items-center gap-5">
                {session && session?.user ? (
                    <>
                        <Link href="/startup/create">
                            <span>About</span>
                        </Link>
                        
                        <button onClick={signOut}>
                            <span>Logout</span>
                        </button>

                        <Link href={`/user/${session?.id}`}>
                            <span>{session ?.user?.name}</span>
                        </Link>
                    </>
                ) : (
                    <button onClick={async () => {
                        "use server";
                        await signIn('github')
                    }}>
                        <span>Login</span>
                    </button>
                )}
            </div>

        </nav>
    </header>
  )
}

export default Navbar;