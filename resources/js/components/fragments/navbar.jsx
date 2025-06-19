import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { Menu, X, Sword, Trophy, User, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Inertia } from "@inertiajs/inertia";

export default function Navbar({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: User },
        { href: "/battle", label: "Battle Arena", icon: Sword },
        { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    ];

    return (
        <nav className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" className="flex items-center space-x-2">
                            <Sword className="h-8 w-8 text-purple-500" />
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Code Battle
                            </span>
                        </a>
                    </div>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                {navItems.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </a>
                                ))}
                                <div className="flex items-center space-x-4">
                                    <div className="text-sm">
                                        <div className="text-gray-300">
                                            {user.name}
                                        </div>
                                        <div className="text-purple-400">
                                            {user.points} pts • {user.rank}
                                        </div>
                                    </div>
                                    {/* <Button
                                        onClick={() => {
                                            Inertia.get("/auth/logout");
                                        }}
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <LogOut className="h-4 w-4" />
                                    </Button> */}
                                    <Link href={route("auth.logout")}>
                                        <LogOut className="h-4 w-4" />
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <a href="/auth/login">
                                    <Button className="bg-pink-600 hover:bg-pink-700 hover:scale-105 transition-all duration-300">
                                        Login
                                    </Button>
                                </a>
                                <a href="/auth/register">
                                    <Button className="bg-purple-600 hover:bg-purple-700 hover:scale-105 transition-all duration-300">
                                        Sign Up
                                    </Button>
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu */}
                    <div className="md:hidden flex items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden bg-gray-900 border-t border-gray-800"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {user ? (
                            <>
                                {navItems.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.label}</span>
                                    </a>
                                ))}
                                <div className="px-3 py-2 border-t border-gray-800 mt-2">
                                    <div className="text-sm text-gray-300">
                                        {user.name}
                                    </div>
                                    <div className="text-sm text-purple-400">
                                        {user.points} pts • {user.rank}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <a
                                    href="/auth/login"
                                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                                >
                                    Login
                                </a>
                                <a
                                    href="/auth/register"
                                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                                >
                                    Sign Up
                                </a>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
