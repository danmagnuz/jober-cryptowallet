import React from "react";
import PropTypes from "prop-types";
import {isEmpty} from "lodash";
import NavItem from "../NavItem";
import NavRoot from "../NavRoot";
import useNavMatch from "hooks/useNavMatch";

const maxLevel = 3;

const NavListItem = ({level, item}) => {
    const match = useNavMatch();
    const active = match(item.path);
    const itemLevel = level + 1;

    if (isEmpty(item.children) || itemLevel >= maxLevel) {
        return <NavItem item={item} active={active} level={itemLevel} />;
    } else {
        return <NavRoot item={item} level={itemLevel} />;
    }
};

NavListItem.propTypes = {
    level: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired
};

export default NavListItem;
