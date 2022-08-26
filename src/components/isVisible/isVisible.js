
import React from 'react'

export default function IsVisible(ref) {
    const [isIntersecting, setIntersecting] = React.useState(false)

    const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting)
    )

    React.useEffect(() => {
        observer.observe(ref.current)

        return () => {
            observer.disconnect();
        }
    })

    return isIntersecting;
}