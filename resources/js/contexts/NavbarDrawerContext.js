import React, {createContext, useCallback, useEffect, useState} from "react";
import PropTypes from "prop-types";
import useScreenType from "hooks/useScreenType";

const NavbarDrawerContext = createContext({
    collapseClick: false,
    collapseHover: false,
    onToggleCollapse: () => {},
    onHoverEnter: () => {},
    onHoverLeave: () => {}
});

const NavbarDrawerProvider = ({children}) => {
    const {isDesktop} = useScreenType();
    const [click, setClick] = useState(false);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (!isDesktop) {
            setClick(false);
            setHover(false);
        }
    }, [isDesktop]);

    const onHoverEnter = useCallback(() => {
        if (click) {
            setHover(true);
        }
    }, [click]);

    const toggleCollapse = useCallback(() => {
        setClick((click) => !click);
    }, []);

    const onHoverLeave = useCallback(() => {
        if (hover) {
            setHover(false);
        }
    }, [hover]);

    return (
        <NavbarDrawerContext.Provider
            value={{
                isCollapse: click && !hover,
                collapseClick: click,
                collapseHover: hover,
                onHoverEnter,
                onToggleCollapse: toggleCollapse,
                onHoverLeave
            }}>
            {children}
        </NavbarDrawerContext.Provider>
    );
};

NavbarDrawerProvider.propTypes = {
    children: PropTypes.node
};

export {NavbarDrawerProvider};
export default NavbarDrawerContext;
