import React from "react";
import IconBuilder from "components/IconBuilder";
import {experimentalStyled as styled} from "@mui/material/styles";
import {Box, MenuItem, TextField} from "@mui/material";
import Wallet from "models/Wallet";

const CoinSelect = ({selectedWallet, setSelected, collection}) => {
    return (
        <BaseStyle>
            <TextField
                size="small"
                value={selectedWallet.id || ""}
                onChange={(e) => setSelected(e.target.value)}
                variant="outlined"
                select>
                {collection.map((record) => {
                    const wallet = Wallet.use(record);
                    const icon = wallet.coin.svgIcon();

                    return (
                        <MenuItem value={wallet.id} key={wallet.id}>
                            <CoinWrapper>
                                <IconBuilder
                                    sx={{fontSize: "25px"}}
                                    icon={icon}
                                />

                                <Box component="span" sx={{ml: 1}}>
                                    {wallet.coin.name}
                                </Box>
                            </CoinWrapper>
                        </MenuItem>
                    );
                })}
            </TextField>
        </BaseStyle>
    );
};

const CoinWrapper = styled("div")({
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    flexBasis: 0
});

const BaseStyle = styled("div")(() => ({
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column"
}));

export default CoinSelect;
