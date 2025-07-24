import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export function LanguagePieChart({ data }) {
    return (
        <>
            <Card className="bg-gray-900/50 border-purple-800 border-2  ">
                <CardHeader>
                    <CardTitle className="text-xl font-extrabold text-blue-400 text-center">
                        Language Statistics
                    </CardTitle>
                </CardHeader>

                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="label"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                labelLine={false}
                                label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: "#1F2937", // bg-gray-800
                                    border: "1px solid #4B5563", // border-gray-600
                                    borderRadius: "0.5rem",
                                }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </>
    );
}
