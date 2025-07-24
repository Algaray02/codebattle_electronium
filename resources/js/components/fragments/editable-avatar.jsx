import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EditableAvatar({ name, imageUrl }) {
    const getInitials = (name) =>
        name
            .split(" ")
            .map((n) => n[0])
            .join("");

    const hasImage = !!imageUrl;

    return (
        <Avatar
            className={`w-24 h-24 text-3xl rounded-full ring-2 ${
                hasImage
                    ? "ring-pink-500 bg-gray-800"
                    : "ring-pink-500 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            } font-bold`}
        >
            <AvatarImage src={imageUrl} alt={name} className="object-cover" />
            <AvatarFallback
                className={`flex items-center justify-center w-full h-full rounded-full ${
                    hasImage
                        ? "bg-gray-800 text-gray-200"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                }`}
            >
                {getInitials(name)}
            </AvatarFallback>
        </Avatar>
    );
}
