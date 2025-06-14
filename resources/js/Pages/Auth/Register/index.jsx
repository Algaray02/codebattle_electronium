import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Sword } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordField from "@/components/fragments/password-field"
import { Link } from "@inertiajs/react"

const registerSchema = z
    .object({
        username: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
        terms: z.literal(true, { message: "You must agree to the terms" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    })

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { terms: false },
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Register data:", data)
        } catch (error) {
            console.error("Registration error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev)
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev)

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md"
            >
                <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-lg border border-gray-700">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center space-x-2 mb-4">
                            <Sword className="h-8 w-8 text-purple-500" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Code Battle
                            </span>
                        </Link>
                        <h1 className="text-2xl font-bold mb-2">Join Code Battle</h1>
                        <p className="text-gray-400">Create your account and start coding</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <Label htmlFor="username" className="text-white">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                {...register("username")}
                                className="mt-1 bg-gray-800 border-gray-600 focus:border-purple-500"
                                placeholder="Enter your username"
                            />
                            {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-white">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                className="mt-1 bg-gray-800 border-gray-600 focus:border-purple-500"
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
                        </div>

                        <PasswordField
                            id="password"
                            label="Password"
                            registerField={register("password")}
                            showPassword={showPassword}
                            toggleVisibility={togglePasswordVisibility}
                            error={errors.password}
                            placeholder="Create a password"
                        />

                        <PasswordField
                            id="confirmPassword"
                            label="Confirm Password"
                            registerField={register("confirmPassword")}
                            showPassword={showConfirmPassword}
                            toggleVisibility={toggleConfirmPasswordVisibility}
                            error={errors.confirmPassword}
                            placeholder="Confirm your password"
                        />

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...register("terms")}
                                className="rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-400">
                                I agree to the{" "}
                                <Link href="/terms" className="text-purple-400 hover:text-purple-300">Terms of Service</Link> and{" "}
                                <Link href="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
                            </span>
                        </div>
                        {errors.terms && <p className="mt-1 text-sm text-red-400">{errors.terms.message}</p>}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                            {isLoading ? "Creating account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <Link href="/login" className="text-purple-400 hover:text-purple-300">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
