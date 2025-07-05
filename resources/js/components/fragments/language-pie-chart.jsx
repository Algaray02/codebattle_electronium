// components/fragments/language-pie-chart.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { LanguageLogos } from "@/components/ui/language-logos";

const COLORS = [
    "#4CAF50",
    "#FFCE56",
    "#FF6384",
    "#36A2EB",
    "#4BC0C0",
    "#9966FF",
];

export function LanguagePieChart({ data }) {
    return (
        <div className="space-y-6">
            <Card className="bg-gray-900/50 border-purple-800 border-2  ">
                <CardHeader>
                    <CardTitle className="text-xl font-extrabold text-blue-400 text-center">
                        Language Statistics
                    </CardTitle>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((lang, index) => {
                    const difficultyData = [
                        { name: "Easy", value: lang.easyAvg || 0 },
                        { name: "Medium", value: lang.mediumAvg || 0 },
                        { name: "Hard", value: lang.hardAvg || 0 },
                    ];

                    return (
                        <Card
                            key={lang.language}
                            className="bg-gray-900/50 border-purple-800 border-2 hover:border-purple-500 h-full"
                        >
                            <CardContent className="p-4 h-full flex flex-col">
                                <div className="flex items-center space-x-4 mb-4">
                                    <LanguageLogos lang={lang} />
                                    <div>
                                        <h3
                                            className={`font-bold text-lg ${lang.color}`}
                                        >
                                            {lang.language}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {lang.battles} battles
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-grow flex flex-col">
                                    <div className="text-center mb-2 text-sm font-medium text-purple-300">
                                        Difficulty Distribution
                                    </div>
                                    <div className="h-40">
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={difficultyData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={40}
                                                    outerRadius={60}
                                                    paddingAngle={2}
                                                    dataKey="value"
                                                >
                                                    {difficultyData.map(
                                                        (entry, i) => (
                                                            <Cell
                                                                key={`cell-${i}`}
                                                                fill={
                                                                    COLORS[
                                                                        i %
                                                                            COLORS.length
                                                                    ]
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </Pie>
                                                <Legend
                                                    iconSize={10}
                                                    layout="horizontal"
                                                    verticalAlign="bottom"
                                                    wrapperStyle={{
                                                        fontSize: "12px",
                                                    }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="mt-auto pt-2 border-t border-purple-900/50">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">
                                            Total Points:
                                        </span>
                                        <span className="font-medium text-blue-300">
                                            {lang.totalPoint} pts
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
