import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function PasswordField({ id, label, registerField, showPassword, toggleVisibility, error, placeholder }) {
    return (
        <div>
            <Label htmlFor={id} className="text-white">
                {label}
            </Label>
            <div className="relative mt-1">
                <Input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    {...registerField}
                    className="bg-gray-800 border-gray-600 focus:border-purple-500 pr-10"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                    aria-label={showPassword ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
            </div>
            {error && <p className="mt-1 text-sm text-red-400">{error.message}</p>}
        </div>
    )
}