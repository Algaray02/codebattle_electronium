import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Code } from "lucide-react";

const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
];

export function LanguageSelector({ value, onChange }) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <div className="flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select language" />
                </div>
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {languages.map((lang) => (
                    <SelectItem
                        key={lang.value}
                        value={lang.value}
                        className="hover:bg-gray-700"
                    >
                        {lang.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
