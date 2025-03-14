import React from 'react';
import Image from 'next/image'

const Layout = ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <section className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-bannerImg bg-repeat bg-cover bg-bottom">
            {children}
        </section>
    );
};

export default Layout;
