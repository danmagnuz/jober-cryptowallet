import React from "react";
import {
    Box,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Typography
} from "@mui/material";
import {styled} from "@mui/material/styles";
import {FormattedMessage} from "react-intl";

const PlanRates = ({rates, value, onChange}) => {
    const handleChange = (_, id) => {
        return onChange?.(rates.find((o) => String(o.id) === id));
    };

    return (
        <Stack spacing={1}>
            <Typography
                variant="overline"
                sx={{color: "text.secondary"}}
                alignSelf="center">
                <FormattedMessage defaultMessage="Duration" />
            </Typography>

            <RadioGroup value={value?.id} onChange={handleChange}>
                <Grid container spacing={1} justifyContent="center">
                    {rates.map((rate) => (
                        <RateOption
                            key={rate.id}
                            checked={value?.id === rate.id}
                            rate={rate}
                        />
                    ))}
                </Grid>
            </RadioGroup>
        </Stack>
    );
};

const RateOption = ({rate, checked = false}) => {
    return (
        <Grid item xs={6}>
            <OptionWrapper>
                <OptionButton checked={checked}>
                    <Typography variant="body2">
                        <FormattedMessage
                            defaultMessage="{days} days"
                            values={{days: rate.days}}
                        />
                    </Typography>
                </OptionButton>

                <FormControlLabel
                    value={rate.id}
                    control={<Radio sx={{display: "none"}} />}
                    sx={{
                        margin: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        position: "absolute"
                    }}
                />
            </OptionWrapper>
        </Grid>
    );
};

const OptionButton = styled(({checked, ...otherProps}) => (
    <Paper variant="outlined" {...otherProps} />
))(({theme, checked}) => ({
    ...(checked && {borderColor: theme.palette.primary.main}),
    textAlign: "center",
    padding: theme.spacing(1),
    whiteSpace: "nowrap",
    overflow: "hidden"
}));

const OptionWrapper = styled(Box)({
    position: "relative"
});

export default PlanRates;
