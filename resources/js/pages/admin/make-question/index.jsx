"use client";

import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MakeQuestionForm } from "@/components/fragments/make-question-form";
import { AIQuestionResult } from "@/components/fragments/ai-question-result";
import Navbar from "@/components/fragments/navbar";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function MakeQuestionPage({ user, difficulties, languages }) {
    const [generatedQuestion, setGeneratedQuestion] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        language: "",
        difficulty: "medium",
        prompt: "",
    });

    const saveForm = useForm({
        title: "",
        language: "",
        difficulty: "",
        description: "",
        correctAnswer: "",
    });

    const handleGenerate = (formData) => {
        post("/admin/generate-question", {
            onSuccess: (page) => {
                setGeneratedQuestion(page.props.generatedQuestion);
                saveForm.setData(page.props.generatedQuestion);
            },
            preserveScroll: true,
        });
    };

    const handleSaveQuestion = (dataSave) => {
        saveForm.post("/admin/generate-question/save", dataSave, {
            onError: (errors) => {
                console.error("Failed to save question:", errors);
            },
            preserveScroll: true,
        });
    };

    const handleRetry = () => {
        post("/admin/generate-question", {
            onSuccess: (page) => {
                setGeneratedQuestion(page.props.generatedQuestion);
                saveForm.setData(page.props.generatedQuestion);
            },
            preserveScroll: true,
        });
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar user={user} />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <CardContent>
                    {!generatedQuestion ? (
                        <MakeQuestionForm
                            onSubmit={handleGenerate}
                            isLoading={processing}
                            difficulties={difficulties}
                            languages={languages}
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    ) : (
                        <AIQuestionResult
                            question={saveForm.data}
                            onSave={handleSaveQuestion}
                            onRetry={handleRetry}
                            isLoading={processing}
                            isSaving={saveForm.processing}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                    )}
                </CardContent>
            </motion.div>
        </div>
    );
}
