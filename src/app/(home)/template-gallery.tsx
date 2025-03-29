"use client"
import React from 'react';
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { tamplate } from '@/constant/tamplates';

export const TamplateGallery = () => {

    const isCreating = false;

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
                                        <div
                                            onClick={() => { }}>
                                            <img className='size-full  hover:border-blue-500 rounded-sm border hover:bg-blue-50
                                            transition flex flex-col items-center justify-center gap-y-4 bg-white' src={tamplate.imageUrl} />
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
