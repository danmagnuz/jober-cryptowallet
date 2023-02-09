import React from "react";
import PropTypes from "prop-types";
import {IconButtonAnimate} from "components/Animate";
import toggleFill from "@iconify-icons/ri/toggle-fill";
import toggleLine from "@iconify-icons/ri/toggle-line";
import Iconify from "components/Iconify";

const CollapseButton = ({onToggleCollapse, collapseClick}) => {
    return (
        <IconButtonAnimate onClick={onToggleCollapse}>
            <Iconify icon={collapseClick ? toggleFill : toggleLine} />
        </IconButtonAnimate>
    );
};

CollapseButton.propTypes = {
    onToggleCollapse: PropTypes.func,
    collapseClick: PropTypes.bool
};

export default CollapseButton;
