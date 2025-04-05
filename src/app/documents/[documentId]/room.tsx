"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {

    const params = useParams();

    return (
        <LiveblocksProvider 
        throttle={16}
        authEndpoint="/api/liveblocks-auths"
        // publicApiKey={"pk_dev_HlPeik6zmCxCRQetTSQjVymUsI7O9sI8xnO5Dx8mwodgDrgcC2w8Fvrl65uej_I-"}
        >
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<div>Loading…</div>}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}