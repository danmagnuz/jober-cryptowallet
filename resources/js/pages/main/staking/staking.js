import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import router from "router/router";
import Plans from "./pages/plans";
import Result404 from "components/Result404";
import Manage from "./pages/manage";

const Staking = () => {
    const indexRoute = router.getRoutePath("main.staking.plans");

    return (
        <Routes>
            <Route index element={<Navigate to={indexRoute} />} />

            <Route
                path={router.getRoutePath("main.staking.manage")}
                element={<Manage />}
            />

            <Route
                path={router.getRoutePath("main.staking.plans")}
                element={<Plans />}
            />

            <Route path="*" element={<Result404 />} />
        </Routes>
    );
};

export default Staking;
