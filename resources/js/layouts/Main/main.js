import React, {useMemo} from "react";
import {Dashboard, DashboardContent, DocStyle} from "../layout";
import Sidebar from "../components/Sidebar";
import Account from "./components/Account";
import Language from "../components/Language";
import Notifications from "../components/Notifications";
import router from "router";
import {useAuth} from "models/Auth";
import {defineMessages, FormattedMessage, useIntl} from "react-intl";
import {Button, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import MemoryIcon from "@mui/icons-material/Memory";
import Clock from "components/Clock";
import {DocIcon} from "assets/index";
import {useSidebarToggle} from "hooks/useSidebarToggle";
import {useBrand} from "hooks/settings";
import MainPages from "pages/main";
import {usePrivateBroadcast} from "services/Broadcast";
import useSidebarItem from "hooks/useSidebarItem";
import PresenceTimer from "components/PresenceTimer";
import Header from "layouts/components/Header";
import useNavbarDrawer from "hooks/useNavbarDrawer";

const messages = defineMessages({
    general: {defaultMessage: "General"},
    marketplace: {defaultMessage: "Marketplace"}
});

const Main = () => {
    const auth = useAuth();
    const brand = useBrand();
    const getSidebarItem = useSidebarItem();
    const intl = useIntl();

    usePrivateBroadcast("App.Models.User." + auth.user.id);

    const links = useMemo(() => {
        return [
            {
                key: "general",
                title: intl.formatMessage(messages.general),
                items: [
                    getSidebarItem({
                        key: "main.home"
                    }),
                    getSidebarItem({
                        key: "main.profile",
                        params: {name: auth.user.name}
                    }),
                    getSidebarItem({
                        key: "main.payments"
                    }),
                    getSidebarItem({
                        key: "main.wallets",
                        module: "wallet"
                    })
                ]
            },
            {
                key: "marketplace",
                title: intl.formatMessage(messages.marketplace),
                items: [
                    getSidebarItem({
                        module: "exchange",
                        key: "main.exchange",
                        children: [
                            getSidebarItem({
                                key: "main.exchange.trade"
                            })
                        ]
                    }),
                    getSidebarItem({
                        module: "peer",
                        key: "main.peer",
                        children: [
                            getSidebarItem({
                                key: "main.peer.buy-crypto"
                            }),
                            getSidebarItem({
                                key: "main.peer.sell-crypto"
                            }),
                            getSidebarItem({
                                key: "main.peer.create-offer"
                            }),
                            getSidebarItem({
                                key: "main.peer.trades"
                            })
                        ]
                    }),
                    getSidebarItem({
                        module: "staking",
                        key: "main.staking",
                        children: [
                            getSidebarItem({
                                key: "main.staking.plans"
                            }),
                            getSidebarItem({
                                key: "main.staking.manage"
                            })
                        ]
                    }),
                    getSidebarItem({
                        key: "main.giftcards",
                        module: "giftcard"
                    })
                ]
            }
        ];
    }, [intl, auth, getSidebarItem]);

    const [sidebarState, openSidebar, closeSidebar] = useSidebarToggle();
    const {collapseClick} = useNavbarDrawer();

    return (
        <Dashboard>
            <PresenceTimer />

            <Header
                onOpenSidebar={openSidebar}
                actions={[
                    <Language key="language" />,
                    <Notifications key="notifications" />,
                    <Account key="account" />
                ]}
            />

            <Sidebar
                isOpenSidebar={sidebarState}
                onCloseSidebar={closeSidebar}
                links={links}
                action={
                    auth.can("access_control_panel") ? (
                        <Button
                            color="primary"
                            component={RouterLink}
                            variant="contained"
                            sx={{boxShadow: "none", mt: 0.5}}
                            to={router.generatePath("admin")}
                            startIcon={<MemoryIcon />}
                            size="small">
                            <FormattedMessage defaultMessage="Control Panel" />
                        </Button>
                    ) : (
                        <Typography
                            variant="caption"
                            sx={{color: "text.secondary"}}
                            noWrap={true}>
                            <Clock />
                        </Typography>
                    )
                }
                extras={
                    <DocStyle sx={{mx: 3, mb: 3, mt: 10}}>
                        <DocIcon sx={{width: 30, mb: 1}} />

                        <Typography
                            variant="subtitle1"
                            sx={{color: "grey.700"}}
                            gutterBottom>
                            <FormattedMessage defaultMessage="Need some help?" />
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{mb: 2, color: "grey.600"}}>
                            <FormattedMessage defaultMessage="Contact one of our support agents." />
                        </Typography>

                        <Button
                            target="_blank"
                            href={brand.supportUrl}
                            variant="contained"
                            fullWidth>
                            <FormattedMessage defaultMessage="Get Support" />
                        </Button>
                    </DocStyle>
                }
            />

            <DashboardContent collapseClick={collapseClick}>
                <MainPages />
            </DashboardContent>
        </Dashboard>
    );
};

export default Main;
