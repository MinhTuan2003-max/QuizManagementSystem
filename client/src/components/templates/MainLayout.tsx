import React from 'react';
import { Navbar } from '../organisms/Navbar';
import { Footer } from '../organisms/Footer';

export const MainLayout = ({ children, isAuthenticated = false }: { children: React.ReactNode; isAuthenticated?: boolean }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar isAuthenticated={isAuthenticated} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};