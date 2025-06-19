import { useState } from "react";
import { useForm } from "@inertiajs/react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordField from "@/components/fragments/password-field";
import { Link } from "@inertiajs/react";
import AuthLayout from "@/layouts/auth-layout";
import { CodeSquare } from "lucide-react";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, errors, processing, post } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        post(route("auth.register"), {
            onFinish: () => setIsLoading(false),
        });
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const toggleConfirmPasswordVisibility = () =>
        setShowConfirmPassword((prev) => !prev);

    return (
        <AuthLayout
            title="Join Code Battle"
            description="Create your account and start coding"
        >
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="name" className="text-white">
                        Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mt-1 bg-gray-800 border-gray-600 focus:border-purple-500"
                        placeholder="Enter your username"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <Label htmlFor="email" className="text-white">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="mt-1 bg-gray-800 border-gray-600 focus:border-purple-500"
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-400">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <PasswordField
                    id="password"
                    label="Password"
                    registerField={{
                        name: "password",
                        value: data.password,
                        onChange: (e) => setData("password", e.target.value),
                    }}
                    showPassword={showPassword}
                    toggleVisibility={togglePasswordVisibility}
                    error={errors.password}
                    placeholder="Create a password"
                />

                <PasswordField
                    id="password_confirmation"
                    label="Confirm Password"
                    registerField={{
                        name: "password_confirmation",
                        value: data.password_confirmation,
                        onChange: (e) =>
                            setData("password_confirmation", e.target.value),
                    }}
                    showPassword={showConfirmPassword}
                    toggleVisibility={toggleConfirmPasswordVisibility}
                    error={errors.password_confirmation}
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
                    <Link
                        href="/auth/login"
                        className="text-purple-400 hover:text-purple-300"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
