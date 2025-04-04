import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style"
import { CommandProps } from '@tiptap/core'

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType
            unsetFontSize: () => ReturnType
        }
    }
}

export const FontSizeExtention = Extension.create({
    name: "fontSize",
    addOptions() {
        return {
            types: ["textStyle"]
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: element => element.style.fontSize,
                        renderHTML: attributes => {
                            if (!attributes.fontSize) return {}
                            return {
                                style: `font-size: ${attributes.fontSize}`
                            }
                        },
                    }
                }
            }
        ]
    },
    addCommands() {
        return {
            setFontSize: (fontSize: string) => ({ chain }: CommandProps) => {
                return chain().setMark("textStyle", { fontSize }).run()
            },
            unsetFontSize: () => ({ chain }: CommandProps) => {
                return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run()
            },
        }
    }
})