"use client"
import {
    BoldIcon, ChevronDownIcon, HighlighterIcon, ItalicIcon,
    ListTodoIcon, LucideIcon,
    MessageSquarePlusIcon, PrinterIcon,
    Redo2Icon, RemoveFormattingIcon,
    SpellCheckIcon, UnderlineIcon,
    Undo2Icon
} from "lucide-react";
import { type ColorResult, SketchPicker } from "react-color";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { type Level } from "@tiptap/extension-heading";

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}




const HighlightColorButton = () => {
    const { editor } = useEditorStore()
    const value = editor?.getAttributes("highlight").color || "#FFFFFF";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )

}


const TextColorButton = () => {
    const { editor } = useEditorStore()


    const value = editor?.getAttributes("textStyle").color || "#000000";

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="text-xs">
                        A
                        <div className="h-0.5 w-full " style={{ backgroundColor: value }} />
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0">
                <SketchPicker color={value} onChange={onChange} />
            </DropdownMenuContent>
        </DropdownMenu>
    )

}


const HeadingLevelButton = () => {
    const { editor } = useEditorStore()

    const heading = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
    ]

    const getCurrectHeading = () => {
        for (let level = 1; level <= 5; level++) {
            if (editor?.isActive("heading", { level })) {
                return `Heading ${level}`
            }
        }
        return "Normal Text"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="truncate">
                        {getCurrectHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {heading.map(({ label, value, fontSize }) => {
                    return (
                        <button
                            key={value}
                            style={{ fontSize }}
                            onClick={() => {
                                if (value === 0) {
                                    editor?.chain().focus().setParagraph().run();
                                } else {
                                    editor?.chain().focus().toggleHeading({ level: value as Level }).run(); // Verify the type using Level
                                    // editor?.chain().focus().setMark("textStyle", { fontSize }).run();
                                }
                            }}
                            className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 ",
                                (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) && "bg-neutral-200/80"
                            )}
                        >
                            {label}
                        </button>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
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
        lable: string;
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
            {sections[0].map((items , idx) => (
                <ToolBarButton key={idx} {...items} />
            ))}

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {/* TODO: font family  */}

            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {/* TODO: Heading  */}
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {/* TODO: Font Size */}
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((items , idx) => (
                <ToolBarButton key={idx} {...items} />
            ))}

            {/* TODO: Text Color */}
            <TextColorButton />
            {/* TODO: Highlight Color */}
            <HighlightColorButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* TODO: Link */}
            {/* TODO: Image */}
            {/* TODO: Align */}
            {/* TODO: Line Height */}
            {/* TODO: List */}
            {sections[2].map((items , idx) => (
                <ToolBarButton key={idx} {...items} />
            ))}
        </div>
    )
}

export default ToolBar
