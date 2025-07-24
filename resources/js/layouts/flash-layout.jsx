import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";

export default function FlashLayout({ children }) {
    const { props } = usePage();
    const { success, error } = props.flash || {};

    // useEffect akan memantau perubahan pada props 'success' dan 'error'
    useEffect(() => {
        if (success) {
            toast.success(success);
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error]);

    return (
        <>
            <Toaster
                position="top-center"
                toastOptions={{
                    className: "bg-gray-800 text-white border border-gray-700",
                    duration: 5000,
                }}
            />
            {/* 'children' adalah komponen halaman Anda */}
            <main>{children}</main>
        </>
    );
}
