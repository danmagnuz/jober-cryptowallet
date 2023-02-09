import React, {useEffect} from "react";
import Wallet from "models/Wallet";
import {Box, MenuItem} from "@mui/material";
import IconBuilder from "components/IconBuilder";
import {TextField} from "components/Form";
import {useWallets} from "hooks/global";
import {experimentalStyled as styled} from "@mui/material/styles";

const WalletSelect = ({onSelect, value, ...props}) => {
    const {wallets} = useWallets();

    useEffect(() => {
        onSelect?.(wallets.find((o) => o.id === value));
    }, [onSelect, wallets, value]);

    return (
        <TextField select value={value} {...props}>
            {wallets.map((record) => {
                const wallet = Wallet.use(record);

                return (
                    <MenuItem key={wallet.id} value={wallet.id}>
                        <CoinWrapper>
                            <IconBuilder
                                icon={wallet.coin.svgIcon()}
                                sx={{fontSize: "25px"}}
                            />

                            <Box component="span" sx={{ml: 1}}>
                                {wallet.coin.name}
                            </Box>
                        </CoinWrapper>
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

const CoinWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0
});

export default WalletSelect;
