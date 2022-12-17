import {useState, useEffect} from 'react'

export const useIntersection = (element, rootMargin) => {
    const [isVisible, setState] = useState(false);

    try {
        useEffect(() => {
            
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        setState(entry.isIntersecting);
                    }, { rootMargin }
                );

                element.current && observer.observe(element.current);

                return () => {

                    if (typeof element !== Element) return;

                    observer.unobserve(element.current)
                };
            
        }, []);
    } catch (error) {
        return;
    } 

    return isVisible;
}
