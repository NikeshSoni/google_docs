"use client"
import { LucideIcon, Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";


interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

const ToolBarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => {
    return (
        <button onClick={onClick}>
            <Icon className={cn(
                "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )} />
        </button>
    )
}

const ToolBar = () => {

    const sections: {
        lable: String;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
                [
                    {
                        lable: "Undo",
                        icon: Undo2Icon,
                        onClick: () => console.log("Undo Click")
                    }
                ]
            ];

    return (
        <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
            {sections[0].map((items) => (
                <ToolBarButton key={items.lable} {...items} />
            ))}
        </div>
    )
}

export default ToolBar
