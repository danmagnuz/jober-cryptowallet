import {useEffect, useState} from "react";

const useMinOffsetY = (top = 100) => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY > top) {
                setStatus(true);
            } else {
                setStatus(false);
            }
        };
        return () => {
            window.onscroll = null;
        };
    }, [top]);

    return status;
};

export default useMinOffsetY;
