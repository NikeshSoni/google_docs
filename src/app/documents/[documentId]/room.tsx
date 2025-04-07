"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullScreenLoder } from "@/components/full-screen-loder";
import { Id } from "../../../../convex/_generated/dataModel";
import { getUsers, getDocuments } from "./action";
import { toast } from "sonner";


type User = {
    id: string;
    name: string;
    avatar: string
}

export function Room({ children }: { children: ReactNode }) {

    const params = useParams();

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = useMemo(
        () => async () => {
            try {
                const list = await getUsers();
                setUsers(list);
            } catch (error) {
                toast.error('Failed to fetch users');
            }
        },
        []
    );

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint={async () => {
                const endPoint = "/api/liveblocks-auths";
                const room = params.documentId as string;

                const responce = await fetch(endPoint, {
                    method: "POST",
                    body: JSON.stringify({ room })
                })
                return await responce.json()
            }}
            resolveUsers={({ userIds }) => {
                return userIds.map(
                    (userId) => users.find((user) => user.id === userId) ?? undefined
                )
            }}
            resolveMentionSuggestions={({ text }) => {
                let filteredUsers = users;

                if (text) {
                    filteredUsers = users.filter((user) =>
                        user.name.toLowerCase().includes(text.toLowerCase())
                    );
                }

                return filteredUsers.map((user) => user.id)
            }}
            resolveRoomsInfo={async ({ roomIds }) => {
                const documents = await getDocuments(roomIds as Id<"documents">[]);
                return documents.map((document) => ({
                    id: document.id,
                    name: document.name,
                }))
            }}
        >
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<FullScreenLoder label="Room Leading..." />}>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider >
    );
}
