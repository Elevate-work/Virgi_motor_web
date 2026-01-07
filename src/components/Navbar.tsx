'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();

    // Check if we are on the homepage
    const isHomepage = pathname === '/';

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    const getTextColor = () => {
        return 'text-tesla-black';
    };

    const getLogoTextColor = () => {
        return 'text-primary';
    };

    const getNavbarBg = () => {
        return 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-3';
    };

    const links = [
        { name: 'Beranda', href: '/' },
        { name: 'Katalog', href: '/katalog' },
        { name: 'Tentang Kami', href: '/tentang-kami' },
    ];

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBg()}`}
        >
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">

                {/* Logo & Hamburger Wrapper */}
                <div className="flex items-center gap-3">
                    {/* Mobile Hamburger */}
                    <button
                        className={`md:hidden ${getTextColor()}`}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} className="text-tesla-black" /> : <Menu size={28} />}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                        <div className="relative">
                            <Image
                                src="/honda-logo.png"
                                alt="Logo Honda"
                                width={50}
                                height={50}
                                className="object-contain w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 drop-shadow-md group-hover:drop-shadow-xl transition-all"
                            />
                            {/* Glow Effect only on homepage transparent */}
                            {isHomepage && !scrolled && (
                                <div className="absolute inset-0 bg-white/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                        </div>

                        <div className="flex flex-col justify-center">
                            <span className={`text-[10px] sm:text-sm md:text-lg lg:text-xl font-bold tracking-tight uppercase whitespace-nowrap leading-none ${getLogoTextColor()} transition-colors`}>
                                POS RESMI VIRGI MOTOR CIKARANG
                            </span>
                            <span className={`hidden sm:block text-[8px] md:text-[10px] tracking-[0.2em] uppercase ${isHomepage && !scrolled && !isOpen ? 'text-white/80' : 'text-gray-500'} transition-colors`}>
                                Official Dealer Partner
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 lg:gap-12 absolute left-1/2 -translate-x-1/2">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-semibold tracking-wide transition-all duration-300 relative group ${getTextColor()} hover:text-primary`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-primary`} />
                        </Link>
                    ))}
                </div>

                {/* Right Button */}
                <div className="hidden md:block">
                    <Link
                        href="/tentang-kami#contact"
                        className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isHomepage && !scrolled
                            ? 'bg-white text-primary hover:bg-cream'
                            : 'bg-primary text-white hover:bg-red-700'
                            }`}
                    >
                        Hubungi Kami
                    </Link>
                </div>

                {/* Mobile 'Contact' Icon/Button */}
                <div className="md:hidden">
                    <Link
                        href="/tentang-kami#contact"
                        className={`px-4 py-2 text-xs font-bold rounded-lg shadow-md transition-colors ${isHomepage && !scrolled && !isOpen
                            ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                            : 'bg-primary text-white'
                            }`}
                    >
                        Chat
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl absolute top-full left-0 right-0 border-t border-gray-100 overflow-hidden shadow-2xl h-screen"
                    >
                        <div className="flex flex-col p-6 space-y-6 items-center pt-12">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl font-bold text-tesla-black hover:text-primary tracking-wide"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="w-full h-px bg-gray-100 my-4" />
                            <Link
                                href="/tentang-kami#contact"
                                onClick={() => setIsOpen(false)}
                                className="w-full py-4 text-center font-bold bg-primary text-white rounded-xl shadow-lg"
                            >
                                Hubungi Kami Sekarang
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
