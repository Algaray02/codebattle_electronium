import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { Menu, X, Sword, Trophy, User, LogOut, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfileDialog from "@/components/fragments/edit-profile-dialog";

export default function Navbar({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const navItems = [
        { href: "/battle", label: "Battle Arena", icon: Sword },
        { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    ];

    const navItemsAdmin = [
        { href: "/admin", label: "Dashboard", icon: User },
        { href: "/make/question", label: "Create Question", icon: Wand2 },
        { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    ];

    const getInitials = (name) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("");

    return (
        <nav className="bg-gray-900/50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <a href="/" className="flex items-center space-x-2">
                        <Sword className="h-7 w-7 text-purple-500" />
                        <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Code Battle
                        </span>
                    </a>

                    {/* Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <>
                                {user.rank === "Admin" ? (
                                    <>
                                        {navItemsAdmin.map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </a>
                                        ))}
                                        <EditProfileDialog
                                            open={isEdit}
                                            onOpenChange={setIsEdit}
                                            showButton={false}
                                            user={user}
                                            onSave={(data) =>
                                                console.log(
                                                    "Update user data:",
                                                    data
                                                )
                                            }
                                        />
                                        <div
                                            onClick={() => setIsEdit(true)}
                                            className="flex items-center space-x-3 px-4 py-1 rounded-lg hover:bg-gray-800"
                                        >
                                            <Avatar className="ring-1 ring-pink-500 w-10 h-10 text-lg rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
                                                <AvatarImage
                                                    src={user.imageUrl}
                                                    alt={user.name}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="text-white bg-gradient-to-r from-purple-500 to-pink-500">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-left">
                                                <div className="text-sm font-semibold text-white">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-purple-400">
                                                    {user.rank}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
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
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-3 px-4 py-1 rounded-lg hover:bg-gray-800 transition-all"
                                        >
                                            <Avatar className="ring-1 ring-pink-500 w-10 h-10 text-lg rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
                                                <AvatarImage
                                                    src={user.imageUrl}
                                                    alt={user.name}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="text-white bg-gradient-to-r from-purple-500 to-pink-500">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-left">
                                                <div className="text-sm font-semibold text-white">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-purple-400">
                                                    {user.points} pts •{" "}
                                                    {user.rank}
                                                </div>
                                            </div>
                                        </Link>
                                    </>
                                )}
                                <Link href={route("auth.logout")}>
                                    <LogOut className="h-5 w-5 text-gray-400 hover:text-white" />
                                </Link>
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
                    <div className="px-4 pt-4 pb-4 space-y-1">
                        {user ? (
                            <>
                                {user.rank === "Admin" ? (
                                    <>
                                        {navItemsAdmin.map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                                            >
                                                <item.icon className="h-4 w-4" />
                                                <span>{item.label}</span>
                                            </a>
                                        ))}
                                        <div className="flex items-center space-x-3 px-3 py-3 rounded-md ">
                                            <Avatar className="ring-1 ring-pink-500 w-10 h-10 text-lg rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
                                                <AvatarImage
                                                    src={user.imageUrl}
                                                    alt={user.name}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="text-white bg-gradient-to-r from-purple-500 to-pink-500">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-left">
                                                <div className="text-sm text-white font-semibold">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-indigo-400">
                                                    {user.rank}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-3">
                                            <Link
                                                href={route("auth.logout")}
                                                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white mt-2"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Logout</span>
                                            </Link>
                                        </div>
                                    </>
                                ) : (
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
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-gray-800"
                                        >
                                            <Avatar className="ring-1 ring-pink-500 w-10 h-10 text-lg rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
                                                <AvatarImage
                                                    src={user.imageUrl}
                                                    alt={user.name}
                                                    className="object-cover"
                                                />
                                                <AvatarFallback className="text-white bg-gradient-to-r from-purple-500 to-pink-500">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="text-left">
                                                <div className="text-sm text-white font-semibold">
                                                    {user.name}
                                                </div>
                                                <div className="text-xs text-indigo-400">
                                                    {user.points} pts •{" "}
                                                    {user.rank}
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="px-3">
                                            <Link
                                                href={route("auth.logout")}
                                                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white mt-2"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Logout</span>
                                            </Link>
                                        </div>
                                    </>
                                )}
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
