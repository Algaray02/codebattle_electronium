import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Settings,
    Users,
    Trophy,
    Code,
    Target,
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    Zap,
    Swords,
} from "lucide-react";
import Navbar from "@/components/fragments/navbar";
import SystemStats from "@/components/fragments/system-stats";
import DifficultyStats from "@/components/fragments/difficult-stats";
import UsersTable from "@/components/fragments/users-table";
import QuestionsTable from "@/components/fragments/question-table";
import QuestionDialog from "@/components/fragments/question-dialog";

// Mock admin user
const adminUser = {
    name: "Admin User",
    points: 0,
    rank: "Admin",
};

// Mock data
const users = [
    {
        id: 1,
        name: "CodeMaster2024",
        email: "codemaster@example.com",
        points: 2150,
        rank: "Immortal",
        battlesTotal: 52,
        status: "Active",
        joined: "2024-01-15",
    },
    {
        id: 2,
        name: "AlgoNinja",
        email: "algoninja@example.com",
        points: 1850,
        rank: "Glory",
        battlesTotal: 44,
        status: "Active",
        joined: "2024-02-03",
    },
    {
        id: 3,
        name: "ByteWarrior",
        email: "bytewarrior@example.com",
        points: 1650,
        rank: "Glory",
        battlesTotal: 41,
        status: "Suspended",
        joined: "2024-01-28",
    },
    {
        id: 4,
        name: "JSExplorer",
        email: "jsexplorer@example.com",
        points: 950,
        rank: "Legend",
        battlesTotal: 28,
        status: "Active",
        joined: "2024-03-10",
    },
    {
        id: 5,
        name: "PythonPro",
        email: "pythonpro@example.com",
        points: 450,
        rank: "Epic",
        battlesTotal: 18,
        status: "Active",
        joined: "2024-04-01",
    },
];

const systemStats = [
    {
        label: "Total Users",
        value: "12,543",
        icon: Users,
        color: "text-blue-400",
    },
    {
        label: "Battles Today",
        value: "2,847",
        icon: Swords,
        color: "text-yellow-400",
    },
    {
        label: "Active Coders",
        value: "8,921",
        icon: Code,
        color: "text-green-400",
    },
    {
        label: "Most Chosen Language",
        value: "45,629",
        icon: Target,
        color: "text-purple-400",
    },
];

const difficultyStats = [
    { level: "Easy", problems: 1256, avgScore: "8.7", color: "text-green-400" },
    {
        level: "Medium",
        problems: 2847,
        avgScore: "23.4",
        color: "text-yellow-400",
    },
    { level: "Hard", problems: 1892, avgScore: "41.8", color: "text-red-400" },
];

const questions = [
    {
        id: 1,
        title: "Two Sum",
        description:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        language: "JavaScript",
        difficulty: "easy",
        points: 10,
        correctAnswer:
            "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}",
    },
    {
        id: 2,
        title: "Reverse Linked List",
        description:
            "Reverse a singly linked list and return the reversed list.",
        language: "Python",
        difficulty: "medium",
        points: 30,
        correctAnswer:
            "def reverseList(head):\n    prev = None\n    current = head\n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    return prev",
    },
    {
        id: 3,
        title: "Binary Tree Inorder Traversal",
        description:
            "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
        language: "Java",
        difficulty: "medium",
        points: 30,
        correctAnswer:
            "public List<Integer> inorderTraversal(TreeNode root) {\n    List<Integer> res = new ArrayList<>();\n    Stack<TreeNode> stack = new Stack<>();\n    TreeNode curr = root;\n    while (curr != null || !stack.isEmpty()) {\n        while (curr != null) {\n            stack.push(curr);\n            curr = curr.left;\n        }\n        curr = stack.pop();\n        res.add(curr.val);\n        curr = curr.right;\n    }\n    return res;\n}",
    },
    {
        id: 4,
        title: "Merge k Sorted Lists",
        description:
            "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        language: "JavaScript",
        difficulty: "hard",
        points: 50,
        correctAnswer:
            "function mergeKLists(lists) {\n    if (!lists.length) return null;\n    return merge(lists, 0, lists.length - 1);\n};\n\nfunction merge(lists, start, end) {\n    if (start === end) return lists[start];\n    const mid = Math.floor((start + end) / 2);\n    const left = merge(lists, start, mid);\n    const right = merge(lists, mid + 1, end);\n    return mergeTwoLists(left, right);\n};\n\nfunction mergeTwoLists(l1, l2) {\n    const dummy = new ListNode();\n    let curr = dummy;\n    while (l1 && l2) {\n        if (l1.val < l2.val) {\n            curr.next = l1;\n            l1 = l1.next;\n        } else {\n            curr.next = l2;\n            l2 = l2.next;\n        }\n        curr = curr.next;\n    }\n    curr.next = l1 || l2;\n    return dummy.next;\n}",
    },
    // Tambahkan lebih banyak soal di sini...
    ...Array.from({ length: 16 }, (_, i) => ({
        id: i + 5,
        title: `Problem ${i + 5}`,
        description: `This is a sample description for problem ${
            i + 5
        }. The problem requires you to implement a solution that meets certain criteria.`,
        language: ["JavaScript", "Python", "Java"][
            Math.floor(Math.random() * 3)
        ],
        difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)],
        points: [10, 30, 50][Math.floor(Math.random() * 3)],
        correctAnswer: `// Sample solution for problem ${
            i + 5
        }\nfunction solution() {\n  // Implementation goes here\n}`,
    })),
];

export default function AdminPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleQuestionClick = (question) => {
        setSelectedQuestion(question);
        setIsDialogOpen(true);
    };

    return (
        <div className="min-h-screen bg-black">
            <Navbar user={adminUser} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Code Battle Dashboard
                        </h1>
                        <p className="text-gray-200">
                            Manage your coding battle platform
                        </p>
                    </div>

                    <Tabs defaultValue="overview" className="mb-8">
                        <TabsList className="bg-gray-900/50 p-1 rounded-lg border border-gray-700">
                            <TabsTrigger
                                value="overview"
                                className="flex items-center space-x-2 px-4 py-2"
                            >
                                <Settings className="h-4 w-4" />
                                <span>Overview</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="users"
                                className="flex items-center space-x-2 px-4 py-2"
                            >
                                <Users className="h-4 w-4" />
                                <span>Users</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="battles"
                                className="flex items-center space-x-2 px-4 py-2"
                            >
                                <Zap className="h-4 w-4" />
                                <span>Battles</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <SystemStats stats={systemStats} />
                                <DifficultyStats
                                    difficultyStats={difficultyStats}
                                />
                            </motion.div>
                        </TabsContent>

                        <TabsContent value="users">
                            <UsersTable
                                users={users}
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                        </TabsContent>

                        <TabsContent value="battles">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <QuestionsTable
                                    questions={questions}
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    onQuestionClick={handleQuestionClick}
                                />
                                <QuestionDialog
                                    question={selectedQuestion}
                                    open={isDialogOpen}
                                    onOpenChange={setIsDialogOpen}
                                />
                            </motion.div>
                        </TabsContent>
                    </Tabs>
                </motion.div>
            </div>
        </div>
    );
}
