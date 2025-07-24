import { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Eye,
    Edit,
    Trash2,
    Code,
    Trophy,
    AlertCircle,
    HardHat,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Link, router } from "@inertiajs/react";

const difficultyBadge = {
    easy: {
        bg: "bg-green-900/20",
        text: "text-green-400",
        icon: <Trophy className="h-4 w-4" />,
    },
    medium: {
        bg: "bg-yellow-900/20",
        text: "text-yellow-400",
        icon: <AlertCircle className="h-4 w-4" />,
    },
    hard: {
        bg: "bg-red-900/20",
        text: "text-red-400",
        icon: <HardHat className="h-4 w-4" />,
    },
};

const languageBadge = {
    JavaScript: "text-yellow-500",
    Python: "text-blue-500",
    Java: "text-red-500",
    "C++": "text-purple-500", // C++
    "C#": "text-green-600", // C#
    PHP: "text-indigo-600",
    Ruby: "text-red-600",
    Kotlin: "text-pink-500",
    "Go (Golang)": "text-cyan-500", // Go (Golang)
    Rust: "text-orange-700",
    Dart: "text-blue-400",
};

export default function QuestionsTable({
    questions,
    searchTerm,
    setSearchTerm,
    onQuestionClick,
}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter questions based on search term
    const filteredQuestions = questions.filter(
        (question) =>
            question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.language.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredQuestions.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const handleEdit = (question) => {
        router.visit(route("question.edit", question.id));
    };

    const handleDelete = (question) => {
        router.delete(route("question.destroy", question.id));
    };

    // Reset to first page when search changes
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total pages is less than max
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Show smart pagination with ellipsis
            if (currentPage <= 3) {
                // Show first 5 pages
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                // Show last 5 pages
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show current page and 2 pages before and after
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            }
        }

        return pages;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search questions..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="pl-10 bg-gray-800 border-gray-600 text-white w-64"
                    />
                </div>
                <Link href="/admin/generate-question">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Question
                    </Button>
                </Link>
            </div>

            <Card className="bg-gray-900/50 border-gray-700">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800/50">
                                <tr>
                                    <th className="text-left p-4 text-gray-200">
                                        Title
                                    </th>
                                    <th className="text-left p-4 text-gray-200">
                                        Description
                                    </th>
                                    <th className="text-center p-4 text-gray-200">
                                        Language
                                    </th>
                                    <th className="text-center p-4 text-gray-200">
                                        Difficulty
                                    </th>
                                    <th className="text-center p-4 text-gray-200">
                                        Points
                                    </th>
                                    <th className="text-center p-4 text-gray-200">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((question) => (
                                        <tr
                                            key={question.id}
                                            className="border-t border-gray-700 hover:bg-gray-800/30 transition-colors"
                                        >
                                            <td className="p-4">
                                                <span className="text-white font-medium">
                                                    {question.title}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <p className="text-gray-400 text-sm line-clamp-1">
                                                    {question.question}
                                                </p>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div
                                                    className={`flex items-center justify-center ${
                                                        languageBadge[
                                                            question.language
                                                        ]
                                                    }`}
                                                >
                                                    <Code className="h-4 w-4 mr-1" />
                                                    {question.language}
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div
                                                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full ${
                                                        difficultyBadge[
                                                            question.difficulty
                                                        ].bg
                                                    } ${
                                                        difficultyBadge[
                                                            question.difficulty
                                                        ].text
                                                    }`}
                                                >
                                                    {
                                                        difficultyBadge[
                                                            question.difficulty
                                                        ].icon
                                                    }
                                                    <span className="capitalize text-sm">
                                                        {question.difficulty}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center text-purple-400 font-medium">
                                                {question.points}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex space-x-2 justify-center">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                                                        onClick={() =>
                                                            onQuestionClick(
                                                                question
                                                            )
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20"
                                                        onClick={() =>
                                                            handleEdit(question)
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                        onClick={() =>
                                                            handleDelete(
                                                                question
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="p-8 text-center text-gray-400"
                                        >
                                            {searchTerm
                                                ? "No questions found matching your search."
                                                : "No questions available."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination */}
            {filteredQuestions.length > itemsPerPage && (
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-400 order-2 sm:order-1">
                        Showing{" "}
                        {filteredQuestions.length > 0
                            ? indexOfFirstItem + 1
                            : 0}
                        -{Math.min(indexOfLastItem, filteredQuestions.length)}{" "}
                        of {filteredQuestions.length} questions
                    </div>

                    <Pagination className="order-1 sm:order-2">
                        <PaginationContent>
                            {/* First Page */}
                            <PaginationItem>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={goToFirstPage}
                                    disabled={currentPage === 1}
                                    className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronsLeft className="h-4 w-4" />
                                </Button>
                            </PaginationItem>

                            {/* Previous Page */}
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={goToPrevPage}
                                    className={`${
                                        currentPage === 1
                                            ? "opacity-50 cursor-not-allowed pointer-events-none"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                />
                            </PaginationItem>

                            {/* Page Numbers */}
                            {getPageNumbers().map((pageNum) => (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        onClick={() =>
                                            handlePageChange(pageNum)
                                        }
                                        isActive={currentPage === pageNum}
                                        className={`cursor-pointer ${
                                            currentPage === pageNum
                                                ? "bg-purple-600 text-white hover:bg-purple-700"
                                                : "text-gray-400 hover:text-white hover:bg-gray-800"
                                        }`}
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {/* Next Page */}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={goToNextPage}
                                    className={`${
                                        currentPage === totalPages
                                            ? "opacity-50 cursor-not-allowed pointer-events-none"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                />
                            </PaginationItem>

                            {/* Last Page */}
                            <PaginationItem>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={goToLastPage}
                                    disabled={currentPage === totalPages}
                                    className="text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronsRight className="h-4 w-4" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}

            {/* Show pagination info even when no pagination needed */}
            {filteredQuestions.length > 0 &&
                filteredQuestions.length <= itemsPerPage && (
                    <div className="mt-6 text-sm text-gray-400">
                        Showing {filteredQuestions.length} of{" "}
                        {filteredQuestions.length} questions
                    </div>
                )}
        </motion.div>
    );
}
