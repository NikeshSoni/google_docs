import { useCallback, useRef } from "react";

export function useDebounce<
    T extends (...arg: Parameters<T>) => ReturnType<T>,
>(callback: T, delay: number = 500) {
    const timeoutRfe = useRef<NodeJS.Timeout>();

    return useCallback(
        (...arg: Parameters<T>) => {
            if (timeoutRfe.current) {
                clearTimeout(timeoutRfe.current)
            }

            timeoutRfe.current = setTimeout(() => {
                callback(...arg)
            }, delay)
        },
        [callback, delay]
    )
}