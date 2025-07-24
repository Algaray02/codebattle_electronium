import { useState } from "react";
import { motion } from "framer-motion";
import { router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Save,
    Code,
    ChevronDown,
    FileText,
    HardDriveDownload,
    Plus,
} from "lucide-react";
import Navbar from "@/components/fragments/navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function QuestionEdit({ question, auth, languages }) {
    const { post, setData, data } = useForm({
        _method: "put",
        title: question?.title || "",
        question: question?.question || "",
        language: question?.language || "JavaScript",
        difficulty: question?.difficulty || "easy",
        max_points: question?.max_points || 10,
        correct_answer: question?.correct_answer || "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        post(route("admin.question.update", question.id), {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: Show success message
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    const handleCancel = () => {
        router.visit("/admin/dashboard");
    };

    return (
        <div className="min-h-screen bg-black">
            <Navbar user={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Edit Question
                            </h1>
                            <p className="text-gray-200">
                                Update the coding challenge details
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="border-gray-600 text-purple-600 "
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Questions
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                                <div>
                                    <Label
                                        htmlFor="title"
                                        className="text-white mb-2 block"
                                    >
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                        className="bg-gray-900 border-gray-700 text-white"
                                        placeholder="Enter question title"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="description"
                                        className="text-white mb-2 block"
                                    >
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.question}
                                        onChange={handleChange}
                                        className="bg-gray-900 border-gray-700 text-white min-h-[150px]"
                                        placeholder="Enter detailed description"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="correctAnswer"
                                        className="text-white mb-2 block"
                                    >
                                        Correct Answer
                                    </Label>
                                    <div className="relative">
                                        <Code className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Textarea
                                            id="correctAnswer"
                                            name="correctAnswer"
                                            value={data.correct_answer}
                                            onChange={handleChange}
                                            className="bg-gray-900 border-gray-700 text-white pl-10 font-mono text-sm min-h-[200px]"
                                            placeholder="Enter the correct solution code"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label className="text-white mb-2 block">
                                        Language
                                    </Label>
                                    <Select
                                        value={data.language}
                                        onValueChange={(value) =>
                                            setData({
                                                ...data,
                                                language: value,
                                            })
                                        }
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                                            {languages.map((lang) => (
                                                <SelectItem
                                                    key={`lang-${lang}`}
                                                    value={lang}
                                                >
                                                    {lang}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label className="text-white mb-2 block">
                                        Difficulty
                                    </Label>
                                    <Select
                                        value={data.difficulty}
                                        onValueChange={(value) =>
                                            setData({
                                                ...data,
                                                difficulty: value,
                                            })
                                        }
                                        disabled={isSubmitting}
                                    >
                                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-900 border-gray-700 text-white">
                                            <SelectItem
                                                value="easy"
                                                className="text-green-400"
                                            >
                                                Easy
                                            </SelectItem>
                                            <SelectItem
                                                value="medium"
                                                className="text-yellow-400"
                                            >
                                                Medium
                                            </SelectItem>
                                            <SelectItem
                                                value="hard"
                                                className="text-red-400"
                                            >
                                                Hard
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label
                                        htmlFor="points"
                                        className="text-white mb-2 block"
                                    >
                                        Points
                                    </Label>
                                    <Input
                                        id="points"
                                        name="points"
                                        type="number"
                                        value={data.max_points}
                                        onChange={handleChange}
                                        className="bg-gray-900 border-gray-700 text-white"
                                        placeholder="Enter points value"
                                        min="1"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-800">
                            <Button
                                type="button"
                                variant="outline"
                                className="border-gray-600 text-purple-600 "
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center ">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2 " />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
