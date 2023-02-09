import React, {useState} from "react";
import PropTypes from "prop-types";
import {isEmpty} from "lodash";
import useNavbarDrawer from "hooks/useNavbarDrawer";
import {List, Collapse} from "@mui/material";
import NavItem from "../NavItem";
import NavListItem from "../NavListItem";
import useNavMatch from "hooks/useNavMatch";

const NavRoot = ({item, level = 0}) => {
    const match = useNavMatch();
    const {isCollapse} = useNavbarDrawer();

    const active = match(item.path);
    const [open, setOpen] = useState(active);

    if (isEmpty(item.children)) {
        return <NavItem item={item} active={active} level={level} />;
    } else {
        return (
            <React.Fragment>
                <NavItem
                    item={item}
                    active={active}
                    level={level}
                    onToggle={() => setOpen(!open)}
                    open={open}
                />

                {!isCollapse && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List
                            component="div"
                            sx={{pl: level * 2}}
                            disablePadding>
                            {item.children.map((item) => (
                                <NavListItem
                                    key={item.key}
                                    item={item}
                                    level={level}
                                />
                            ))}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    }
};

NavRoot.propTypes = {
    item: PropTypes.object.isRequired,
    level: PropTypes.number
};

export default NavRoot;
