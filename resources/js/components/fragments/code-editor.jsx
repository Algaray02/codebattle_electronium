import { useState, useRef, useEffect, useMemo } from "react";
import {
    Play,
    Copy,
    Check,
    Download,
    Upload,
    Settings,
    Maximize2,
    Minimize2,
} from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const THEMES = {
    dark: {
        bg: "bg-gray-900",
        headerBg: "bg-gray-800",
        border: "border-gray-700",
        text: "text-white",
        lineNumbers: "text-gray-500",
        placeholder: "placeholder-gray-400",
    },
    monokai: {
        bg: "bg-gray-800",
        headerBg: "bg-gray-700",
        border: "border-gray-600",
        text: "text-green-400",
        lineNumbers: "text-gray-400",
        placeholder: "placeholder-gray-300",
    },
};

export default function CodeEditor({
    language = "javascript",
    setData,
    initialCode = "",
    onSubmit,
    onCodeChange,
    readOnly = false,
    height = "24rem",
    theme = "dark",
    fontSize = "sm",
    tabSize = 2,
    wordWrap = false,
    placeholder,
    className = "",
}) {
    const [code, setCode] = useState(initialCode);
    const [copied, setCopied] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState(theme);
    const [currentFontSize, setCurrentFontSize] = useState(fontSize);
    const [lineHeight, setLineHeight] = useState(24); // Default line height in pixels

    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);

    const themeConfig = THEMES[currentTheme] || THEMES.dark;

    // Calculate line count and sync with textarea
    const lineCount = useMemo(() => {
        return Math.max(code.split("\n").length, 1); // Ensure at least 1 line
    }, [code]);

    // Sync line numbers and textarea scroll
    useEffect(() => {
        if (textareaRef.current && lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    }, [code]);

    // Calculate line height based on font size
    useEffect(() => {
        const calculateLineHeight = () => {
            const sizes = {
                xs: 20,
                sm: 24,
                base: 28,
                lg: 32,
            };
            setLineHeight(sizes[currentFontSize] || 24);
        };
        calculateLineHeight();
    }, [currentFontSize]);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        onCodeChange?.(newCode);
        setData("answer", newCode);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    const handleDownload = () => {
        const fileExtensions = {
            javascript: "js",
            python: "py",
            java: "java",
            cpp: "cpp",
        };

        const extension = fileExtensions[language.toLowerCase()] || "txt";
        const blob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `code.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            const spaces = " ".repeat(tabSize);
            const newCode =
                code.substring(0, selectionStart) +
                spaces +
                code.substring(selectionEnd);
            handleCodeChange(newCode);

            // Move cursor to the end of the inserted spaces
            setTimeout(() => {
                textareaRef.current.selectionStart =
                    textareaRef.current.selectionEnd = selectionStart + tabSize;
            }, 0);
        }
    };

    const handleScroll = () => {
        if (lineNumbersRef.current && textareaRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const fontSizeClasses = {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
    };

    return (
        <div
            className={`${themeConfig.bg} rounded-lg ${
                themeConfig.border
            } border overflow-hidden ${
                isFullScreen ? "fixed inset-20 z-50 shadow-2xl" : ""
            } ${className}`}
            style={{
                maxHeight: isFullScreen ? "calc(100vh - 10rem)" : "none",
                width: isFullScreen ? "90vw" : "100%",
                left: isFullScreen ? "5vw" : "auto",
            }}
        >
            {/* Editor Header */}
            <div
                className={`flex items-center justify-between px-4 py-1 ${themeConfig.headerBg} ${themeConfig.border} border-b`}
            >
                <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className={`text-sm ${themeConfig.text} font-medium`}>
                        {language}
                    </span>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="hover:bg-gray-700/50"
                        title="Copy code"
                    >
                        {copied ? (
                            <Check className="h-4 w-4 text-green-500" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDownload}
                        className="hover:bg-gray-700/50"
                        title="Download"
                    >
                        <Download className="h-4 w-4" />
                    </Button>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-gray-700/50"
                                title="Settings"
                            >
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            className={`${themeConfig.bg} ${themeConfig.border} ${themeConfig.text} rounded-lg max-w-md p-6`}
                        >
                            <DialogHeader>
                                <DialogTitle
                                    className={`text-lg font-semibold ${themeConfig.text}`}
                                >
                                    Editor Settings
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                                <div>
                                    <Label
                                        className={`block text-sm font-medium ${themeConfig.text} mb-2`}
                                    >
                                        Theme
                                    </Label>
                                    <Select
                                        value={currentTheme}
                                        onValueChange={setCurrentTheme}
                                    >
                                        <SelectTrigger
                                            className={`w-full ${themeConfig.bg} ${themeConfig.border}`}
                                        >
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent
                                            className={`${themeConfig.bg} ${themeConfig.border} ${themeConfig.text}`}
                                        >
                                            <SelectItem value="dark">
                                                Dark
                                            </SelectItem>
                                            <SelectItem value="monokai">
                                                Monokai
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label
                                        className={`block text-sm font-medium ${themeConfig.text} mb-2`}
                                    >
                                        Font Size
                                    </Label>
                                    <Select
                                        value={currentFontSize}
                                        onValueChange={setCurrentFontSize}
                                    >
                                        <SelectTrigger
                                            className={`w-full ${themeConfig.bg} ${themeConfig.border}`}
                                        >
                                            <SelectValue placeholder="Select font size" />
                                        </SelectTrigger>
                                        <SelectContent
                                            className={`${themeConfig.bg} ${themeConfig.border} ${themeConfig.text}`}
                                        >
                                            <SelectItem value="xs">
                                                Extra Small
                                            </SelectItem>
                                            <SelectItem value="sm">
                                                Small
                                            </SelectItem>
                                            <SelectItem value="base">
                                                Medium
                                            </SelectItem>
                                            <SelectItem value="lg">
                                                Large
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleFullScreen}
                        className="hover:bg-gray-700/50"
                        title="Toggle fullscreen"
                    >
                        {isFullScreen ? (
                            <Minimize2 className="h-4 w-4" />
                        ) : (
                            <Maximize2 className="h-4 w-4" />
                        )}
                    </Button>

                    {/* {!readOnly && (
                        <Button
                            size="sm"
                            onClick={() => onSubmit?.(code)}
                            className="bg-green-600 hover:bg-green-700"
                            title="Run code"
                        >
                            <Play className="h-4 w-4 mr-1" />
                            Run
                        </Button>
                    )} */}
                </div>
            </div>

            {/* Editor Body */}
            <div
                className="flex relative"
                style={{
                    height: isFullScreen ? "calc(100vh - 12.7rem)" : height,
                    maxHeight: isFullScreen ? "none" : height,
                }}
            >
                {/* Line Numbers */}
                <div
                    ref={lineNumbersRef}
                    className={`absolute top-0 left-0 h-full overflow-y-auto py-2 ${themeConfig.lineNumbers} ${fontSizeClasses[currentFontSize]} font-mono select-none`}
                    style={{
                        width: "3rem",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    <div
                        className="flex flex-col items-end pr-2"
                        style={{ minHeight: "100%" }}
                    >
                        {Array.from({ length: lineCount }, (_, i) => (
                            <div
                                key={i + 1}
                                className="flex items-center justify-end w-full"
                                style={{ height: `${lineHeight}px` }}
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => handleCodeChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={handleScroll}
                    readOnly={readOnly}
                    className={`w-full h-full p-2 pl-12 ${themeConfig.bg} ${
                        themeConfig.text
                    } font-mono ${fontSizeClasses[currentFontSize]} 
                        resize-none focus:outline-none ${
                            wordWrap ? "whitespace-pre-wrap" : "whitespace-pre"
                        }
                        ${themeConfig.placeholder}`}
                    placeholder={
                        placeholder || `Write your ${language} code here...`
                    }
                    spellCheck={false}
                    style={{
                        tabSize: tabSize,
                        MozTabSize: tabSize,
                        lineHeight: `${lineHeight}px`,
                    }}
                />
            </div>
        </div>
    );
}
