import React from "react";
import {LazyMotion} from "framer-motion";
import PropTypes from "prop-types";

const loadFeatures = () => import("./features.js").then((res) => res.default);

const MotionLazyContainer = ({children}) => {
    return (
        <LazyMotion features={loadFeatures} strict>
            {children}
        </LazyMotion>
    );
};

MotionLazyContainer.propTypes = {
    children: PropTypes.node
};

export default MotionLazyContainer;
