import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const width = (typeof window !== 'undefined' ? window.innerWidth : 800)
    const height = (typeof window !== 'undefined' ? window.innerHeight : 800)
    return {
        width,
        height
    };
}

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export const useRefDimensions = (myRef) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setWidth(myRef.current.offsetWidth)
            setHeight(myRef.current.offsetHeight)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }

    }, [myRef])

    return { width, height }
}