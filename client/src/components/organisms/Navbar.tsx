import React from 'react';
import logoSrc from '@/assets/icons/logo.png';
import avatarDefault from '@/assets/images/avatar-5.png';

interface NavbarProps {
    isAuthenticated?: boolean;
    userName?: string;
    avatarSrc?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ isAuthenticated = false, userName = 'User', avatarSrc }) => {
    const avatar = avatarSrc || avatarDefault;

    return (
        <nav className="sticky top-0 z-50 w-full h-[60px] bg-white border-b border-[#DEE2E0] flex justify-center items-center">
            <div className="w-full max-w-[1316px] px-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <img src={logoSrc} alt="Quizzes logo" className="w-[70px] h-[48px] object-contain" />
                    <span className="text-[24px] font-medium text-black">Quizzes</span>
                </div>

                {/* Menu Section */}
                <div className="hidden md:flex items-center gap-4">
                    {['Home', 'Quizzes', 'About', 'Contact'].map((item) => (
                        <a key={item} href={`/${item.toLowerCase()}`} className="text-base text-black px-2 py-3 hover:text-blue-500 transition-colors">
                            {item}
                        </a>
                    ))}
                </div>

                {/* Auth Section */}
                <div className="flex items-center gap-4 px-2">
                    {!isAuthenticated ? (
                        <>
                            <a href="/auth/login" className="text-base text-black hover:text-blue-500 transition-colors">Login</a>
                            <a href="/auth/register" className="text-base text-black hover:text-blue-500 transition-colors">Register</a>
                        </>
                    ) : (
                        <div className="relative">
                            <button aria-haspopup="true" aria-expanded="false" className="flex items-center gap-3 focus:outline-none">
                                <img src={avatar} alt={`${userName} avatar`} className="w-10 h-10 rounded-full object-cover" />
                            </button>
                            {/* Simple dropdown placeholder; implement interactivity in JS later */}
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-sm hidden" aria-hidden="true">
                                <a href="/profile" className="block px-3 py-2 text-sm hover:bg-slate-50">Profile</a>
                                <a href="/change-password" className="block px-3 py-2 text-sm hover:bg-slate-50">Change Password</a>
                                <a href="/auth/logout" className="block px-3 py-2 text-sm text-red-600 hover:bg-slate-50">Logout</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};