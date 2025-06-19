import { useState, useRef, useEffect, useMemo } from "react"
import { Play, RotateCcw, Copy, Check, Download, Upload, Eye, EyeOff, Settings, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const THEMES = {
    dark: {
        bg: 'bg-gray-900',
        headerBg: 'bg-gray-800',
        border: 'border-gray-700',
        text: 'text-white',
        lineNumbers: 'text-gray-500',
        placeholder: 'placeholder-gray-400'
    },
    light: {
        bg: 'bg-white',
        headerBg: 'bg-gray-100',
        border: 'border-gray-300',
        text: 'text-gray-900',
        lineNumbers: 'text-gray-400',
        placeholder: 'placeholder-gray-500'
    },
    monokai: {
        bg: 'bg-gray-800',
        headerBg: 'bg-gray-700',
        border: 'border-gray-600',
        text: 'text-green-400',
        lineNumbers: 'text-gray-400',
        placeholder: 'placeholder-gray-300'
    }
}

export default function CodeEditor({
    language = "javascript",
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
    className = ""
}) {
    const [code, setCode] = useState(initialCode)
    const [copied, setCopied] = useState(false)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [currentTheme, setCurrentTheme] = useState(theme)
    const [currentFontSize, setCurrentFontSize] = useState(fontSize)

    const textareaRef = useRef(null)
    const fileInputRef = useRef(null)
    const editorRef = useRef(null)

    const themeConfig = THEMES[currentTheme] || THEMES.dark

    const lineCount = useMemo(() => {
        return Math.max(code.split('\n').length, 20)
    }, [code])

    const handleCodeChange = (newCode) => {
        setCode(newCode)
        onCodeChange?.(newCode)
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy code:', err)
        }
    }

    const handleReset = () => {
        handleCodeChange(initialCode)
    }

    const handleSubmit = () => {
        onSubmit?.(code)
    }

    const handleDownload = () => {
        const fileExtensions = {
            javascript: 'js',
            python: 'py',
            java: 'java',
            cpp: 'cpp',
            html: 'html',
            css: 'css'
        }

        const extension = fileExtensions[language.toLowerCase()] || 'txt'
        const blob = new Blob([code], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `code.${extension}`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault()
            const start = e.target.selectionStart
            const end = e.target.selectionEnd
            const spaces = ' '.repeat(tabSize)
            const newCode = code.substring(0, start) + spaces + code.substring(end)
            handleCodeChange(newCode)

            setTimeout(() => {
                textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + tabSize
            }, 0)
        }
    }

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen)
    }

    const fontSizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg'
    }

    return (
        <div className={`${themeConfig.bg} rounded-lg ${themeConfig.border} border overflow-hidden ${isFullScreen ? 'fixed inset-4 z-50' : ''} ${className}`}>
            <div className={`flex items-center justify-between px-4 py-2 ${themeConfig.headerBg} ${themeConfig.border} border-b`}>
                <div className="flex items-center space-x-3">
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className={`text-sm ${themeConfig.text} font-medium`}>{language}</span>
                    <span className={`text-xs ${themeConfig.lineNumbers}`}>
                        {code.split('\n').length} lines | {code.length} chars
                    </span>
                </div>

                <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} title="Upload file">
                        <Upload className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleDownload} title="Download">
                        <Download className="h-4 w-4" />
                    </Button>

                    <Button variant="ghost" size="sm" onClick={handleCopy} title="Copy code">
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>

                    {(language.toLowerCase() === 'html' || language.toLowerCase() === 'css') && (
                        <Button variant="ghost" size="sm" onClick={() => setShowPreview(!showPreview)} title="Toggle preview">
                            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    )}

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" title="Settings">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className={`${themeConfig.bg} ${themeConfig.border} ${themeConfig.text} rounded-lg backdrop-blur-sm bg-opacity-80 max-w-md p-6`}>
                            <DialogHeader>
                                <DialogTitle className={`text-lg font-semibold ${themeConfig.text}`}>Settings</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-6 mt-4">
                                <div>
                                    <Label htmlFor="theme" className={`block text-sm font-medium ${themeConfig.text} mb-2`}>
                                        Theme
                                    </Label>
                                    <Select
                                        value={currentTheme}
                                        onValueChange={(value) => setCurrentTheme(value)}
                                    >
                                        <SelectTrigger id="theme" className={`w-full ${themeConfig.bg} ${themeConfig.border} border ${themeConfig.text} rounded-md`}>
                                            <SelectValue placeholder="Select theme" />
                                        </SelectTrigger>
                                        <SelectContent className={`${themeConfig.bg} ${themeConfig.border} ${themeConfig.text} rounded-md`}>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="monokai">Monokai</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="font-size" className={`block text-sm font-medium ${themeConfig.text} mb-2`}>
                                        Font Size
                                    </Label>
                                    <Select
                                        value={currentFontSize}
                                        onValueChange={(value) => setCurrentFontSize(value)}
                                    >
                                        <SelectTrigger id="font-size" className={`w-full font-medium ${themeConfig.bg} ${themeConfig.border} border ${themeConfig.text} rounded-md`}>
                                            <SelectValue placeholder="Select font size" />
                                        </SelectTrigger>
                                        <SelectContent className={`${themeConfig.bg} ${themeConfig.border} ${themeConfig.text} rounded-md`}>
                                            <SelectItem value="xs">Extra Small</SelectItem>
                                            <SelectItem value="sm">Small</SelectItem>
                                            <SelectItem value="base">Medium</SelectItem>
                                            <SelectItem value="lg">Large</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button variant="ghost" size="sm" onClick={toggleFullScreen} title="Toggle fullscreen">
                        {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>

                    {!readOnly && (
                        <>
                            <Button variant="ghost" size="sm" onClick={handleReset} title="Reset">
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button size="sm" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700" title="Run code">
                                <Play className="h-4 w-4 mr-1" />
                                Run
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="flex" style={{ height: isFullScreen ? 'calc(100vh - 8rem)' : height }}>
                <div className="flex-1 relative">
                    <div className={`absolute top-0 left-0 p-4 pointer-events-none select-none ${themeConfig.lineNumbers} ${fontSizeClasses[currentFontSize]} font-mono`}>
                        <div className="flex flex-col space-y-0 leading-6">
                            {Array.from({ length: lineCount }, (_, i) => (
                                <div key={i + 1} className="h-6 flex items-center justify-end pr-2 min-w-8">
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    <textarea
                        ref={textareaRef}
                        value={code}
                        onChange={(e) => handleCodeChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        readOnly={readOnly}
                        className={`
              w-full h-full p-4 ${themeConfig.bg} ${themeConfig.text} font-mono ${fontSizeClasses[currentFontSize]} 
              resize-none focus:outline-none leading-6 pl-16
              ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}
              ${themeConfig.placeholder}
            `}
                        placeholder={placeholder || `Write your ${language} code here...`}
                        spellCheck={false}
                        style={{
                            tabSize: tabSize,
                            MozTabSize: tabSize
                        }}
                    />
                </div>

                {showPreview && (language.toLowerCase() === 'html' || language.toLowerCase() === 'css') && (
                    <div className={`w-1/2 ${themeConfig.border} border-l`}>
                        <div className={`px-4 py-2 ${themeConfig.headerBg} ${themeConfig.border} border-b ${themeConfig.text} text-sm font-medium`}>
                            Preview
                        </div>
                        <iframe
                            srcDoc={language.toLowerCase() === 'html' ? code : `<style>${code}</style><div>CSS Preview</div>`}
                            className="w-full h-full border-0"
                            title="Code Preview"
                        />
                    </div>
                )}
            </div>

        </div>
    )
}