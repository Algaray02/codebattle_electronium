import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, UserCog } from "lucide-react";

export default function EditProfileDialog({
    user,
    onSave,
    showButton = true,
    open: externalOpen = false,
    onOpenChange,
}) {
    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
        password: "",
    });
    const [internalOpen, setInternalOpen] = useState(false);

    // Sync internal state with external open prop
    useEffect(() => {
        if (externalOpen !== undefined) {
            setInternalOpen(externalOpen);
        }
    }, [externalOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = () => {
        onSave?.(form);
        setInternalOpen(false);
        if (onOpenChange) onOpenChange(false);
    };

    const handleOpenChange = (open) => {
        setInternalOpen(open);
        if (onOpenChange) onOpenChange(open);
    };

    return (
        <Dialog open={internalOpen} onOpenChange={handleOpenChange}>
            {showButton && (
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        className="text-gray-300 bg-gradient-to-r from-purple-900/30 to-purple-900/30 hover:bg-purple-500/20 border border-purple-700"
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="bg-gradient-to-br from-gray-900 to-black border border-purple-900 shadow-xl p-6">
                <DialogHeader className="mb-4">
                    <div className="flex items-center space-x-3">
                        <UserCog className="w-6 h-6 text-purple-400" />
                        <DialogTitle className="text-purple-300 text-2xl font-extrabold tracking-wide">
                            Edit Your Profile
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="grid gap-5">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Name
                        </label>
                        <Input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="bg-gray-800 text-white border border-purple-600 focus:ring-purple-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Email
                        </label>
                        <Input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="bg-gray-800 text-white border border-purple-600 focus:ring-purple-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">
                            Password
                        </label>
                        <Input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type="password"
                            className="bg-gray-800 text-white border border-purple-600 focus:ring-purple-500"
                            placeholder="********"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Leave blank if you don't want to change password.
                        </p>
                    </div>
                </div>

                <DialogFooter className="mt-6">
                    <Button
                        onClick={handleSubmit}
                        className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold"
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
