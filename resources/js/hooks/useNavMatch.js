import {matchPath, useLocation} from "react-router-dom";
import {useCallback} from "react";
import {isNull} from "lodash";

const useNavMatch = () => {
    const {pathname} = useLocation();

    return useCallback(
        (pattern) => !isNull(matchPath(`${pattern}/*`, pathname)),
        [pathname]
    );
};

export default useNavMatch;
