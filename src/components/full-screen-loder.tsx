import { LoaderIcon } from "lucide-react";

interface FullscreenLoader {
    label?: string;
}

export const FullScreenLoder = ({ label }: FullscreenLoader) => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-2">
            <LoaderIcon className="size-6 text-muted-foreground animate-spin" />
            {label && <p className="text-sm text-muted-foreground">{label}</p>}
        </div>
    )
}


