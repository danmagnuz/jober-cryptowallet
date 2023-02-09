import {useCallback, useState} from "react";

export function usePatchElement() {
    const [elements, setElements] = useState([]);

    const patchElement = useCallback((element) => {
        setElements((o) => [...o, element]);
        return () => {
            setElements((o) => o.filter((ele) => ele !== element));
        };
    }, []);
    return [elements, patchElement];
}
