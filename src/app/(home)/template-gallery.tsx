"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';

import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { tamplate } from '@/constant/tamplates';
import { api } from '../../../convex/_generated/api';
import { toast } from 'sonner';
import Image from 'next/image';


export const TamplateGallery = () => {

    // const isCreating = false;
    const router = useRouter();
    const create = useMutation(api.documents.create)

    const [isCreating, setIsCreating] = useState(false);

    const onTamplateClick = (title: string, initialContent: string) => {
        setIsCreating(true);
        create({ title, initialContent })
            .catch(() =>
                toast.error("Something went wrong", {
                    style: {
                        backgroundColor: '#f87171',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        padding: '16px',
                    },
                    icon: "⚠️",
                }))
            .then((documentId) => {
                toast.success("Successfully Added Document", {
                    style: {
                        backgroundColor: '#4ade80',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        padding: '16px',
                    },
                    icon: "✅",
                })
                router.push(`/documents/${documentId}`)
            }).finally(() => {
                setIsCreating(false)
            })
    }

    return (
        <div className='bg-[#F1F3F4]'>
            <div className="flex max-w-screen-xl mx-auto px-16 py-6 flex-col gap-y-4">
                <h3 className='font-medium'> Start a new document</h3>

                <Carousel>
                    <CarouselContent className='-ml-4'>
                        {tamplate.map((tamplate) => {
                            return (
                                <CarouselItem
                                    key={tamplate.id}
                                    className='basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 
                                               2xl:basis-[14.285714%] pl-4' >
                                    <div className={cn(
                                        "aspect-3/4 flex flex-col gap-y-2.5",
                                        isCreating && "pointer-events-none opacity-50"
                                    )}>
                                        <div>
                                            {/* Todo: Add proper Initial content */}
                                            <Image onClick={() => onTamplateClick(tamplate.lable, tamplate.initialContent)}
                                                className='size-full  hover:border-blue-500 rounded-sm border hover:bg-blue-50
                                            transition flex flex-col items-center justify-center gap-y-4 bg-white' src={tamplate.imageUrl} alt={tamplate.lable} />
                                        </div>
                                        <p className='text-sm font-medium truncate'>
                                            {tamplate.lable}
                                        </p>
                                    </div>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />

                </Carousel>
            </div>
        </div>
    )
}
