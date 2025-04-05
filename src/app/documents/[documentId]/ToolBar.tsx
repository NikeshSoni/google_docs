"use client"
import { createElement, useState } from "react";
import {
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, ItalicIcon,
    Link2Icon,
    ListCollapseIcon,
    ListIcon,
    ListOrderedIcon,
    ListTodoIcon, LucideIcon,
    MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon,
    Redo2Icon, RemoveFormattingIcon,
    SearchIcon,
    SpellCheckIcon, UnderlineIcon,
    Undo2Icon,
    UploadIcon
} from "lucide-react";
import { type ColorResult, SketchPicker } from "react-color";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Dialog, DialogContent,
    DialogFooter, DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { type Level } from "@tiptap/extension-heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Value } from "@radix-ui/react-select";
import TextAlign from "@tiptap/extension-text-align";

interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

const LineHeightButton = () => {
    const { editor } = useEditorStore()

    const lineHeights = [
        {
            label: "Default",
            value: "normal"
        },
        {
            label: "Single",
            value: "1"
        },
        {
            label: "1.5",
            value: "1.5"
        },
        {
            label: "Double",
            value: "2"
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 mx-1 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <ListCollapseIcon className="size-6" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {lineHeights.map(({ label, value }) => {
                    return (
                        <Button key={value}
                            onClick={() => editor?.chain().focus().setLingHeight(value).run()}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-netural-200/80",
                                editor?.getAttributes("paragraph").lineHeight === value && "bg-netural-200/80"
                            )}
                        >
                            {/* <Icon className="size-4" /> */}
                            <span className="text-sm">{label}</span>
                        </Button>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontSizeButton = () => {
    const { editor } = useEditorStore()

    const currentFontSize = editor?.getAttributes("textStyle").fontSize ?
        editor?.getAttributes("textStyle").fontSize.replace("px", "") : "16px";

    const [fontSize, setFontSize] = useState(currentFontSize);
    const [inputValue, setInputValue] = useState(fontSize);
    const [isEditing, setIsEditing] = useState(false)


    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();

            setFontSize(newSize)
            setInputValue(newSize)
            setIsEditing(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands.focus();
        }
    }

    const increment = () => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString());
    }

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if (newSize > 0) {
            updateFontSize(newSize.toString());
        }
    }

    return (
        <div className="flex intems-center gap-x-0.5">
            <button
                onClick={decrement}
                className="h-7 w-11 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                <MinusIcon className="size-4" />
            </button>

            {isEditing ? (
                <Input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent hover:bg-neutral-200/80"
                />
            ) : (
                <button
                    onClick={() => {
                        setIsEditing(true);
                        setFontSize(currentFontSize)
                    }}
                    className="h-7 w-10 text-sm border border-neutral-400 text-center rounded-sm bg-transparent cursor-text">
                    {currentFontSize}
                </button>
            )}
            <button
                onClick={increment}
                className="h-7 w-11 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
                <PlusIcon className="size-4" />
            </button>
        </div>
    )
}

const ListButton = () => {
    const { editor } = useEditorStore()

    const list = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive("bulletList"),
            onClick: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            label: "Orderd List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive("orderedList"),
            onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 mx-1 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <ListIcon className="size-6" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {list.map(({ label, icon: Icon, onClick, isActive }) => {
                    return (
                        <Button
                            key={label}
                            onClick={onClick}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-netural-200/80",
                                isActive() && "bg-netural-200/80"
                            )}
                        >
                            <Icon className="size-4" />
                            {label}
                        </Button>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const AlignButton = () => {
    const { editor } = useEditorStore()

    const alignMent = [
        {
            lable: "Align Left",
            value: "left",
            icon: AlignLeftIcon,
        },
        {
            lable: "Align Center",
            value: "center",
            icon: AlignCenterIcon,
        },
        {
            lable: "Align Right",
            value: "right",
            icon: AlignRightIcon,
        },
        {
            lable: "Align Justify",
            value: "justify",
            icon: AlignJustifyIcon,
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 mx-1 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <AlignLeftIcon className="size-6" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {alignMent.map(({ lable, value, icon: Icon }) => {
                    return (
                        <Button key={value}
                            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-netural-200/80",
                                editor?.isActive({ textAlign: value }) && "bg-netural-200/80"
                            )}
                        >
                            <Icon className="size-4" />
                            <span className="text-sm">{lable}</span>
                        </Button>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ImageButton = () => {
    const { editor } = useEditorStore()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imgUrl, setImgUrl] = useState("");

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run();
    }

    const onUpload = () => {
        const input = document.createElement("input")
        input.type = "file";
        input.accept = "image/*"
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                onChange(imageUrl)
            }
        }
        input.click();
    }

    const handleImageUrlSubmit = () => {
        if (imgUrl) {
            setIsDialogOpen(false);
            onChange(imgUrl);
            setImgUrl("");
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 ">
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-6 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="size-6 mr-2" />
                        Paste image url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert Image Url</DialogTitle>
                        <Input
                            placeholder="Insert Image Url"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleImageUrlSubmit()
                                }
                            }}
                        />
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

const LinkButton = () => {
    const { editor } = useEditorStore()

    const [value, setValue] = useState("");

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();

        setValue("");
    }

    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href)
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 ">
                <Input
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChange(value)}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
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
                    className="h-7 min-w-7 mx-1 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
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
                    className="h-7 min-w-6 mx-1 my-auto shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
                    <span className="text-xl">
                        A
                        <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
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
                "text-sm h-7 min-w-6 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
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
                    onClick: () => editor?.chain().focus().addPendingComment().run(),
                    isActive: editor?.isActive("liveblocksCommentMark")
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
            {sections[0].map((items, idx) => (
                <div className="mx-1">
                    <ToolBarButton key={idx} {...items} />
                </div>
            ))}

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {/* TODO: font family  */}

            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {/* TODO: Heading  */}
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {/* TODO: Font Size */}

            <FontSizeButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {sections[1].map((items, idx) => (
                <div className="mx-1">
                    <ToolBarButton key={idx} {...items} />
                </div>
            ))}

            {/* TODO: Text Color */}
            <TextColorButton />
            {/* TODO: Highlight Color */}
            <HighlightColorButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            {/* TODO: Link */}
            <LinkButton />
            {/* TODO: Image */}
            <ImageButton />
            {/* TODO: Align */}
            <AlignButton />
            {/* TODO: Line Height */}
            <LineHeightButton />
            {/* TODO: List */}
            <ListButton />

            {sections[2].map((items, idx) => (
                <div className="mx-1">
                    <ToolBarButton key={idx} {...items} />
                </div>
            ))}
        </div>
    )
}

export default ToolBar
