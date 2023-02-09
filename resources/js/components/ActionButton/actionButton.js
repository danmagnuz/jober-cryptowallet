import React, {forwardRef} from "react";
import {IconButtonAnimate} from "components/Animate";

const ActionButton = forwardRef(({sx, active, ...otherProps}, parentRef) => {
    return (
        <IconButtonAnimate
            ref={parentRef}
            color={active ? "primary" : "default"}
            sx={{bgcolor: active ? "action.selected" : "none", ...sx}}
            {...otherProps}
        />
    );
});

export default ActionButton;
