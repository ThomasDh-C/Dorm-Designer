import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const width = (typeof window !== 'undefined' ? window.innerWidth : 800)
    const height = (typeof window !== 'undefined' ? window.innerHeight : 800)
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
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