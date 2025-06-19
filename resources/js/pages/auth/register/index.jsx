import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordField from "@/components/fragments/password-field"
import { Link } from "@inertiajs/react"
import AuthLayout from "@/layouts/auth-layout"

const registerSchema = z
    .object({
        username: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
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
        <AuthLayout title="Join Code Battle" description="Create your account and start coding">
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
                    <Link href="/auth/login" className="text-purple-400 hover:text-purple-300">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}
