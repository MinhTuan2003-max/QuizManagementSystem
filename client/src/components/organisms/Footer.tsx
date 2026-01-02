export const Footer = () => {
    return (
        <footer className="w-full border-t border-slate-200 bg-white pt-12 pb-6">
            <div className="app-container grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Logo & Intro */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <img src="../../../src/assets/icons/logo.png" alt="logo" className="w-[70px] h-[48px]" />
                        <span className="text-[28px]">Quizzes</span>
                    </div>
                    <p className="text-slate-500 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>

                {/* Menu */}
                <div className="space-y-4 md:pl-20">
                    <h4 className="text-xl font-bold">Menu</h4>
                    <ul className="space-y-2 text-[#38B6FF] text-sm">
                        <li><a href="/home">Home</a></li>
                        <li><a href="/quizzes">Quizzes</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h4 className="text-xl font-bold">Contact</h4>
                    <div className="space-y-3 text-sm text-[#38B6FF]">
                        <a
                            href="mailto:minhtuanha2829@gmail.com"
                            className="flex items-center gap-2 hover:text-[#5CC5FF] transition-colors"
                        >
                            <img src="../../../src/assets/icons/envelope-regular.png" alt="mail" className="w-5 h-5" />
                            <span>minhtuanha2829@gmail.com</span>
                        </a>

                        <a
                            href="tel:+84367133632"
                            className="flex items-center gap-2 hover:text-[#5CC5FF] transition-colors"
                        >
                            <img src="../../../src/assets/icons/phone-solid.png" alt="phone" className="w-5 h-5" />
                            <span>+84 367 133 632</span>
                        </a>

                        <a
                            href="https://maps.app.goo.gl/abC49vt3FJsK7azw7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-[#5CC5FF] transition-colors"
                        >
                            <img src="../../../src/assets/icons/location-dot-solid.png" alt="address" className="w-5 h-5" />
                            <span>NHS Trung Van, Nam Tu Liem, Ha Noi</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="app-container mt-12 pt-6 border-t border-slate-100 text-center text-slate-400 text-sm">
                © January 2026 - ReactJS 19
            </div>
        </footer>
    );
};