import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InputField({
    id,
    label,
    type = "text",
    register,
    error,
    placeholder,
    className = "",
}) {
    return (
        <div>
            <Label htmlFor={id} className="text-white">
                {label}
            </Label>
            <Input
                id={id}
                type={type}
                {...register}
                className={`mt-1 bg-gray-800 border-gray-600 focus:border-purple-500 ${className}`}
                placeholder={placeholder}
            />
            {error && <p className="mt-1 text-sm text-red-400">{error.message}</p>}
        </div>
    )
}
