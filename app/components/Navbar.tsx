import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
    const {data: session} = useSession();

    return (
        <nav className='bg-blue-500 p-4'>
            <div >

            </div>
        </nav>
    )
}