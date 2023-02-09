import React from "react";
import {FormattedMessage} from "react-intl";
import loginCircle from "@iconify/icons-ph/sign-in-fill";
import lockPassword from "@iconify/icons-ph/keyhole-fill";
import lockUnlock from "@iconify/icons-ph/lock-key-open-fill";
import global from "@iconify/icons-ph/globe-simple-fill";
import home from "@iconify/icons-ph/house-fill";
import userAdd from "@iconify/icons-ph/user-plus-fill";
import user from "@iconify/icons-ph/user-circle-fill";
import shoppingBag from "@iconify/icons-ph/shopping-bag-fill";
import profile from "@iconify/icons-ph/identification-badge-fill";
import lifebuoy from "@iconify/icons-ph/lifebuoy-fill";
import exchange from "@iconify/icons-ph/currency-circle-dollar-fill";
import peers from "@iconify/icons-ph/users-three-fill";
import broadcast from "@iconify/icons-ph/broadcast-fill";
import createDraft from "@iconify/icons-ph/clipboard-text-fill";
import gift from "@iconify/icons-ph/gift-fill";
import rocket from "@iconify/icons-ph/rocket-launch-fill";
import shoppingCart from "@iconify-icons/ri/shopping-cart-line";
import bank from "@iconify/icons-ph/vault-fill";
import wallet from "@iconify/icons-ph/coins-fill";
import passport from "@iconify-icons/ri/shield-line";
import controlPanel from "@iconify/icons-ph/gauge-fill";
import group from "@iconify/icons-ph/users-fill";
import store from "@iconify/icons-ph/storefront-fill";
import shieldStar from "@iconify/icons-ph/shield-star-fill";
import settings from "@iconify/icons-ph/gear-six-fill";
import stack from "@iconify/icons-ph/puzzle-piece-fill";
import circleCheck from "@iconify/icons-ph/circle-wavy-check-fill";
import translate from "@iconify/icons-ph/translate-fill";
import paintBrush from "@iconify/icons-ph/paint-brush-broad-fill";
import plug from "@iconify/icons-ph/cpu-fill";

const config = [
    {
        key: "auth",
        icon: lockPassword,
        path: "auth/*",
        name: <FormattedMessage defaultMessage="Auth" />,
        children: [
            {
                key: "login",
                icon: loginCircle,
                path: "login",
                name: <FormattedMessage defaultMessage="Login" />
            },
            {
                key: "forgot-password",
                icon: lockUnlock,
                path: "forgot-password",
                name: <FormattedMessage defaultMessage="Forgot Password" />
            },
            {
                key: "register",
                icon: userAdd,
                path: "register",
                name: <FormattedMessage defaultMessage="Register" />
            }
        ]
    },
    {
        key: "main",
        icon: global,
        path: "*",
        name: <FormattedMessage defaultMessage="Main" />,
        children: [
            {
                key: "home",
                icon: home,
                path: "home",
                name: <FormattedMessage defaultMessage="Home" />
            },
            {
                key: "user",
                icon: user,
                path: "user/*",
                name: <FormattedMessage defaultMessage="User" />,
                children: [
                    {
                        key: "purchases",
                        icon: shoppingBag,
                        path: "purchases",
                        name: <FormattedMessage defaultMessage="Purchases" />
                    },
                    {
                        key: "account",
                        icon: user,
                        path: "account",
                        name: <FormattedMessage defaultMessage="Account" />
                    }
                ]
            },
            {
                key: "profile",
                icon: profile,
                path: "profile/:name",
                name: <FormattedMessage defaultMessage="Profile" />
            },
            {
                key: "user-setup",
                icon: profile,
                path: "user-setup",
                name: <FormattedMessage defaultMessage="User Setup" />
            },
            {
                key: "settings",
                icon: settings,
                path: "settings",
                name: <FormattedMessage defaultMessage="Settings" />
            },
            {
                key: "help",
                icon: lifebuoy,
                path: "help",
                name: <FormattedMessage defaultMessage="Help" />
            },
            {
                key: "wallets",
                icon: wallet,
                path: "wallets",
                name: <FormattedMessage defaultMessage="Wallets" />
            },
            {
                key: "exchange",
                icon: exchange,
                path: "exchange/*",
                name: <FormattedMessage defaultMessage="Exchange" />,
                children: [
                    {
                        key: "trade",
                        icon: exchange,
                        path: "trade",
                        name: <FormattedMessage defaultMessage="Trade" />
                    },
                    {
                        key: "swap",
                        icon: exchange,
                        path: "swap",
                        name: <FormattedMessage defaultMessage="Swap" />
                    }
                ]
            },
            {
                key: "peer",
                icon: peers,
                path: "peer/*",
                name: <FormattedMessage defaultMessage="P2P" />,
                children: [
                    {
                        key: "buy-crypto",
                        icon: broadcast,
                        path: "buy-crypto",
                        name: <FormattedMessage defaultMessage="Buy Crypto" />
                    },
                    {
                        key: "sell-crypto",
                        icon: broadcast,
                        path: "sell-crypto",
                        name: <FormattedMessage defaultMessage="Sell Crypto" />
                    },
                    {
                        key: "trades",
                        icon: peers,
                        path: "trades",
                        name: <FormattedMessage defaultMessage="My Trades" />
                    },
                    {
                        key: "create-offer",
                        icon: createDraft,
                        path: "create-offer",
                        name: <FormattedMessage defaultMessage="Create Offer" />
                    },
                    {
                        key: "offer",
                        icon: broadcast,
                        path: "offer/:id",
                        name: <FormattedMessage defaultMessage="Offer" />
                    },
                    {
                        key: "trade",
                        icon: exchange,
                        path: "trade/:id",
                        name: <FormattedMessage defaultMessage="Trade" />
                    }
                ]
            },
            {
                key: "staking",
                icon: rocket,
                path: "staking/*",
                name: <FormattedMessage defaultMessage="Staking" />,
                children: [
                    {
                        key: "manage",
                        icon: rocket,
                        path: "manage",
                        name: <FormattedMessage defaultMessage="Manage" />
                    },
                    {
                        key: "plans",
                        icon: broadcast,
                        path: "plans",
                        name: <FormattedMessage defaultMessage="Plans" />
                    }
                ]
            },
            {
                key: "giftcards",
                icon: gift,
                path: "giftcards/*",
                name: <FormattedMessage defaultMessage="Giftcards" />,
                children: [
                    {
                        key: "checkout",
                        icon: shoppingCart,
                        path: "checkout",
                        name: <FormattedMessage defaultMessage="Checkout" />
                    },
                    {
                        key: "shop",
                        icon: shoppingBag,
                        path: "shop",
                        name: <FormattedMessage defaultMessage="Shop" />
                    }
                ]
            },
            {
                key: "payments",
                icon: bank,
                path: "payments",
                name: <FormattedMessage defaultMessage="Payments" />
            },
            {
                key: "limits",
                icon: passport,
                path: "limits",
                name: <FormattedMessage defaultMessage="Limits" />
            }
        ]
    },
    {
        key: "admin",
        icon: controlPanel,
        path: "admin/*",
        name: <FormattedMessage defaultMessage="Admin" />,
        children: [
            {
                key: "home",
                icon: home,
                path: "home",
                name: <FormattedMessage defaultMessage="Dashboard" />
            },
            {
                key: "wallets",
                icon: wallet,
                path: "wallets",
                name: <FormattedMessage defaultMessage="Wallets" />
            },
            {
                key: "users",
                icon: group,
                path: "users",
                name: <FormattedMessage defaultMessage="Users" />
            },
            {
                key: "marketplace",
                icon: store,
                path: "marketplace",
                name: <FormattedMessage defaultMessage="Marketplace" />
            },
            {
                key: "peer",
                icon: peers,
                path: "peer",
                name: <FormattedMessage defaultMessage="P2P" />
            },
            {
                key: "verification",
                icon: shieldStar,
                path: "verification",
                name: <FormattedMessage defaultMessage="Verification" />
            },
            {
                key: "payments",
                icon: bank,
                path: "payments",
                name: <FormattedMessage defaultMessage="Payments" />
            },
            {
                key: "exchange",
                icon: exchange,
                path: "exchange",
                name: <FormattedMessage defaultMessage="Exchange" />
            },
            {
                key: "staking",
                icon: rocket,
                path: "staking",
                name: <FormattedMessage defaultMessage="Staking" />
            },
            {
                key: "giftcards",
                icon: gift,
                path: "giftcards",
                name: <FormattedMessage defaultMessage="Giftcards" />
            },
            {
                key: "settings",
                icon: settings,
                path: "settings",
                name: <FormattedMessage defaultMessage="Settings" />
            },
            {
                key: "verification",
                icon: circleCheck,
                path: "verification",
                name: <FormattedMessage defaultMessage="Verification" />
            },
            {
                key: "modules",
                icon: stack,
                path: "modules",
                name: <FormattedMessage defaultMessage="Modules" />
            },
            {
                key: "localization",
                icon: translate,
                path: "localization",
                name: <FormattedMessage defaultMessage="Localization" />
            },
            {
                key: "customize",
                icon: paintBrush,
                path: "customize",
                name: <FormattedMessage defaultMessage="Customize" />
            },
            {
                key: "developer",
                icon: plug,
                path: "developer",
                name: <FormattedMessage defaultMessage="Developer" />
            }
        ]
    }
];

export default config;
