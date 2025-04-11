import { useRef, useState } from "react";
import { BsCloudCheck } from "react-icons/bs"
import { Id } from "../../../../convex/_generated/dataModel"
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { LoaderIcon } from "lucide-react";

interface documentInputProps {
    title: string;
    id: Id<"documents">;
}

const DocumentInput = ({ title, id }: documentInputProps) => {

    const status = useStatus();

    const [value, setValue] = useState(title)
    const [isPending, setIsPending] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const mutate = useMutation(api.documents.updateById);


    const debounceUpdate = useDebounce((newValue: string) => {
        if (newValue === title) return;

        setIsPending(true)
        mutate({ id, title: newValue })
            .then(() => toast.success("Document Updated", {
                style: {
                    backgroundColor: '#4ade80',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '16px',
                },
                icon: "✅",
            })).catch(() => toast.error("Something went wrong", {
                style: {
                    backgroundColor: '#f87171',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '16px',
                },
                icon: "⚠️",
            })).finally(() => setIsPending(false))
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        // TODO Debounce Value 

        debounceUpdate(newValue)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setIsPending(true)
        mutate({ id, title: value })
            .then(() => {
                toast.success("Document Updated", {
                    style: {
                        backgroundColor: '#4ade80',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        padding: '16px',
                    },
                    icon: "✅",
                })
                setIsEditing(false)
            }).catch(() => toast.error("Something went wrong", {
                style: {
                    backgroundColor: '#f87171',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    padding: '16px',
                },
                icon: "⚠️",
            })).finally(() => setIsPending(false))
    }

    const showLoader = isPending || status === "connecting" || status === "reconnecting";
    const showError = status === "disconnected";


    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form onSubmit={handleSubmit} className="relative w-fit max-w-[50ch]">
                    <span className="invisible whitespace-pre px-2 py-1 text-lg">
                        {value || " "}
                    </span>
                    <Input
                        ref={inputRef}
                        value={value}
                        onChange={onChange}
                        onBlur={() => setIsEditing(false)}
                        className="absolute inset-0 px-2 py-1 text-lg text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-150"
                    />
                </form>
            ) : (
                <span
                    onClick={() => {
                        setIsEditing(true);
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 0);
                    }}
                    className="text-lg px-2 py-1 text-gray-800 cursor-pointer rounded hover:bg-gray-100 transition-colors duration-150 truncate"
                >
                    {title}
                </span>
            )}

            {showError && <BsCloudCheck className="size-4" />}
            
            {!showError && !showLoader && < BsCloudCheck className="text-green-500 text-xl" />}

            {showLoader && <LoaderIcon className="size-4 animate-spine text-muted-foreground" />}

        </div>

    )
}

export default DocumentInput