import {useCallback, useEffect, useState} from "react";

export const useScrollPosition = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY || document.documentElement.scrollTop);
    }, []);

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return scrollY;
}