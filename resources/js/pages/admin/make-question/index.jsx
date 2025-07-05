"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MakeQuestionForm } from "@/components/fragments/make-question-form";
import { AIQuestionResult } from "@/components/fragments/ai-question-result";
import Navbar from "@/components/fragments/navbar";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const adminUser = {
    name: "Admin User",
    points: 0,
    rank: "Admin",
};

const generateQuestionWithAI = async ({ language, difficulty, prompt }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const prompts = `
            Anda adalah seorang ahli pembuat soal untuk platform kuis pemrograman.
            Berdasarkan informasi berikut:
            - Bahasa Pemrograman: ${language}
            - Tingkat Kesulitan: ${difficulty}
            - keterangan tambahan: ${prompt}

            Buatlah SATU soal pemrograman dalam bahasa Inggris. Respons HANYA dalam format JSON yang valid tanpa teks atau markup tambahan (seperti \`\`\`json).
            Gunakan struktur JSON berikut:
            {
              "title": "Judul soal yang singkat dan jelas",
              "language": "${language}",
              "difficulty": "${difficulty}",
              "description": "Deskripsi masalah yang detail. Jelaskan apa yang harus dilakukan, input yang diterima, dan output yang diharapkan. Berikan contoh jika perlu.",
              "correctAnswer": "Kode solusi yang lengkap dan benar untuk masalah tersebut."
            }
        `;
    const result = await model.generateContent(prompts);
    const responseText = result.response.text();
    const cleanedText = responseText
        .replace(/```json/g, "") // Hapus ```json di awal
        .replace(/```/g, "") // Hapus ``` di akhir
        .trim();
    const parsedQuestion = JSON.parse(cleanedText);
    return parsedQuestion;
};

export default function MakeQuestionPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [generatedQuestion, setGeneratedQuestion] = useState(null);
    const [formData, setFormData] = useState(null);

    const handleGenerate = async (data) => {
        setIsGenerating(true);
        setFormData(data);

        try {
            const question = await generateQuestionWithAI(data);
            setGeneratedQuestion(question);
        } catch (error) {
            console.error("Error generating question:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveQuestion = async (question) => {
        setIsSaving(true);
        // Simulate save to database
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log("Question saved:", question);
        setIsSaving(false);
        // Redirect or show success message
    };

    const handleRetry = () => {
        handleGenerate(formData);
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar user={adminUser} />
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
                            isLoading={isGenerating}
                        />
                    ) : (
                        <AIQuestionResult
                            question={generatedQuestion}
                            onSave={handleSaveQuestion}
                            onRetry={handleRetry}
                            isLoading={isGenerating}
                            isSaving={isSaving}
                        />
                    )}
                </CardContent>
            </motion.div>
        </div>
    );
}
