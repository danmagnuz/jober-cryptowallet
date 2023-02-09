import React from "react";
import WalletAccount from "models/WalletAccount";
import {Box, MenuItem} from "@mui/material";
import IconBuilder from "components/IconBuilder";
import {TextField} from "components/Form";
import {useWalletAccounts} from "hooks/account";
import {experimentalStyled as styled} from "@mui/material/styles";

const AccountSelect = (props) => {
    const {data} = useWalletAccounts();

    return (
        <TextField fullWidth select {...props}>
            {data.map((record) => {
                const account = WalletAccount.use(record);
                const icon = account.wallet.coin.svgIcon();

                return (
                    <MenuItem value={account.id} key={account.id}>
                        <CoinWrapper>
                            <IconBuilder sx={{fontSize: "25px"}} icon={icon} />

                            <Box component="span" sx={{ml: 1}}>
                                {account.wallet.coin.name}
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

export default AccountSelect;
