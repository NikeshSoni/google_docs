
import { Extension, getAttributes } from "@tiptap/react";


declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        lingHeight: {
            setLingHeight: (lingHeight: string) => ReturnType
            unsetLingHeight: () => ReturnType
        }
    }
}


export const LingHeightExtension = Extension.create({
    name: "lineHeight",
    addOptions() {
        return {
            type: ["paragraph", "heading"],
            defaultLineHeight: "normal",
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,

                attributes: {
                    lineHeight: {
                        default: this.options.defaultLineHeight,
                        renderHTML: attributes => {
                            if (!attributes.lineHeight) return {}

                            return {
                                style: `line-height: ${attributes.lineHeight}`
                            }
                        },
                        parseHTML: element => {
                            return element.style.lineHeight || this.options.defaultLineHeight
                        }
                    }
                }
            }
        ]
    },
    addCommands() {
        return {
            setLingHeight: (lineHeight: string) => ({ tr, state, dispatch }) => {
                const { selection } = state;
                tr = tr.setSelection(selection);

                const { from, to } = selection;
                state.doc.nodesBetween(from, to, (node, post) => {
                    if (this.options.types.includes(node.type.name)) {
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            lineHeight,
                        })
                    }
                })

                if (dispatch) dispatch(tr)
                return true;
            }
        }
    }

})