"use client"
import { useEffect, useState } from "react";

export const Hydrate = ({ children }: { children: React.ReactNode }) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])
    return (
        <>
            {loaded && (<>
                {children}
            </>)}
        </>
    )
}