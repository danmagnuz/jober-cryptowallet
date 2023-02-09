import {useContext} from "react";
import NavbarDrawerContext from "contexts/NavbarDrawerContext";

const useNavbarDrawer = () => useContext(NavbarDrawerContext);

export default useNavbarDrawer;
