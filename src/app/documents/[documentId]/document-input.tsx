import { useRef, useState } from "react";
import { BsCloudCheck } from "react-icons/bs"
import { Id } from "../../../../convex/_generated/dataModel"
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";

interface documentInputProps {
    title: string;
    id: Id<"documents">;
}

const DocumentInput = ({ title, id }: documentInputProps) => {

    const [value, setValue] = useState(title)

    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const mutate = useMutation(api.documents.updateById);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        // TODO Debounce Value 
    }

    return (
        <div className='flex items-center gap-2'>
            {isEditing ? (
                <form className="relative w-fit max-w-[50ch]">
                    <span className="invisible whitespace-pre px-1.5 text-lg">
                        {value || " "}
                    </span>
                    <Input
                        ref={inputRef}
                        value={value}
                        onChange={onChange}
                        className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate "
                    />
                </form>
            ) : (
                <span
                    onClick={() => {
                        setIsEditing(true);
                        setTimeout(() => {
                            inputRef.current?.focus()
                        }, 0)
                    }}
                    className='text-lg px-1.5 cursor-pointer truncate'>
                    {title}
                </span>
            )
            }
            <BsCloudCheck />
        </div >
    )
}

export default DocumentInput