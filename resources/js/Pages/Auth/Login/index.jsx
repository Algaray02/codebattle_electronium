import { useState } from "react"
import { Link } from "@inertiajs/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import AuthLayout from "@/layouts/auth-layout"
import InputField from "@/components/ui/input-field"
import PasswordField from "@/components/fragments/password-field"

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log("Login data:", data)
        } catch (error) {
            console.error("Login error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

    return (
        <AuthLayout title="Welcome Back" description="Sign in to continue your coding journey">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField
                    id="email"
                    label="Email"
                    type="email"
                    register={register("email")}
                    error={errors.email}
                    placeholder="Enter your email"
                />

                <PasswordField
                    id="password"
                    label="Password"
                    registerField={register("password")}
                    showPassword={showPassword}
                    toggleVisibility={togglePasswordVisibility}
                    error={errors.password}
                    placeholder="Create a password"
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/auth/register" className="text-purple-400 hover:text-purple-300">
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    )
}
