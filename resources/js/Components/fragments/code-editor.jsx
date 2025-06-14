import { useState } from "react"
import { Play, RotateCcw, Copy, Check } from "lucide-react"
import { Button } from "../ui/button"

export default function CodeEditor({ language, initialCode = "", onSubmit, readOnly = false }) {
    const [code, setCode] = useState(initialCode)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleReset = () => {
        setCode(initialCode)
    }

    const handleSubmit = () => {
        onSubmit?.(code)
    }

    return (
        <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">{language}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    {!readOnly && (
                        <>
                            <Button variant="ghost" size="sm" onClick={handleReset}>
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                            <Button size="sm" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                                <Play className="h-4 w-4 mr-1" />
                                Run
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="relative">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    readOnly={readOnly}
                    className="w-full h-96 p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none"
                    placeholder={`Write your ${language} code here...`}
                    spellCheck={false}
                />
                <div className="absolute top-0 left-0 p-4 pointer-events-none">
                    <div className="flex flex-col space-y-1 text-gray-500 text-sm font-mono">
                        {Array.from({ length: 20 }, (_, i) => (
                            <div key={i + 1} className="h-5 flex items-center">
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
