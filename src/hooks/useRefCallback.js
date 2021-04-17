import { useState, useCallback } from "react";

const useCallbackRef = () => {
    const [node, setNode] = useState(null);
    const ref = useCallback((element) => {
        if (element !== null) {
            setNode(element);
        }
    }, []);
    return [node, ref];
};

export default useCallbackRef;
