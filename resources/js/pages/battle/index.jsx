import { useState } from "react";
import BattleSetupScreen from "@/components/fragments/battle-setup";
import { useForm } from "@inertiajs/react";

// // Mock user data
// const user = {
//     name: "Alex Johnson",
//     points: 450,
//     rank: "Epic",
// };

// // Configuration options
// const languages = [
//     { value: "javascript", label: "JavaScript" },
//     { value: "python", label: "Python" },
//     { value: "java", label: "Java" },
//     { value: "cpp", label: "C++" },
//     { value: "csharp", label: "C#" },
// ];

const difficulties = [
    { value: "easy", label: "Easy", points: 10, color: "text-green-400" },
    { value: "medium", label: "Medium", points: 25, color: "text-yellow-400" },
    { value: "hard", label: "Hard", points: 50, color: "text-red-400" },
];

export default function BattlePage(user) {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");

    const { post, data, setData, processing } = useForm({
        language: "",
        difficulty: "",
    });

    const handleStartBattle = () => {
        if (!data.language || !data.difficulty) {
            console.log("isinya kosong");
            return;
        }
        post(route("battle.start"));
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <BattleSetupScreen
                user={user.user}
                selectedLanguage={data.language}
                selectedDifficulty={data.difficulty}
                setData={setData}
                handleStartBattle={handleStartBattle}
                languages={user.languages}
                difficulties={difficulties}
                processing={processing}
            />
        </div>
    );
}
