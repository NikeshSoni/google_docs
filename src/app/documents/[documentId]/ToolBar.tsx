"use client"
import { BoldIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";


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

    const { editor } = useEditorStore()

    const sections: {
        lable: String;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [

            //  index  section [0]
            [
                {
                    lable: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    lable: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    lable: "Prient",
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    lable: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    }
                },
            ],

            // Index Section [1]
            [
                {
                    lable: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    lable: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    lable: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                },
            ],

            // index section [2]
            [
                {
                    lable: "Comment ",
                    icon: MessageSquarePlusIcon,
                    onClick: () => console.log("TODO: comment"),
                    isActive: false // TODO: Enable this functionality 
                },
                {
                    lable: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("taskList"),
                },
                {
                    lable: "Remove Formating",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                    isActive: editor?.isActive("taskList"),
                },
            ]
        ];

    return (
        <div className='bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto'>
            {sections[0].map((items) => (
                <ToolBarButton key={items.lable} {...items} />
            ))}

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {/* TODO: font family  */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {/* TODO: Heading  */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {/* TODO: Font Size */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((items) => (
                <ToolBarButton key={items.lable} {...items} />
            ))}

            {/* TODO: Text Color */}
            {/* TODO: Highlight Color */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* TODO: Link */}
            {/* TODO: Image */}
            {/* TODO: Align */}
            {/* TODO: Line Height */}
            {/* TODO: List */}
            {sections[2].map((items) => (
                <ToolBarButton key={items.lable} {...items} />
            ))}


        </div>
    )
}

export default ToolBar
