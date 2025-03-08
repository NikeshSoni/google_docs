"use client"
import {
    BoldIcon, ChevronDownIcon, ItalicIcon,
    ListTodoIcon, LucideIcon,
    MessageSquarePlusIcon, PrinterIcon,
    Redo2Icon, RemoveFormattingIcon,
    SpellCheckIcon, UnderlineIcon,
    Undo2Icon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}


const HeadingLevelButton = () => {
    const { editor } = useEditorStore()

    const heading  = [
        { label: "Normal text", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Verdana", value: "Verdana" },
    ]
}

const FontFamilyButton = () => {
    const { editor } = useEditorStore()

    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Verdana", value: "Verdana" },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {fonts.map(({ label, value }) => {
                    return (
                        <button
                            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                            key={value} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ",
                                editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                            )}
                            style={{ fontFamily: value }}
                        >
                            <span className="text-sm">
                                {label}
                            </span>
                        </button>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
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

            <FontFamilyButton />
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
