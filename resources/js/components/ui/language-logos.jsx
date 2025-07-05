const languageLogos = {
    javascript: "/images/logos/javascript.png",
    python: "/images/logos/python.png",
    java: "/images/logos/java.png",
    cpp: "/images/logos/cpp.png",
    go: "/images/logos/go.png",
    html: "/images/logos/html.png",
};

export function LanguageLogos({ lang }) {
    return (
        <img
            src={languageLogos[lang.language.toLowerCase()]}
            alt={lang.language}
            className="w-10 h-10 rounded"
        />
    );
}
