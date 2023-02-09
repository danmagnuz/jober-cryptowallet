import Model from "models/Model";
import {formatDollar, formatValue} from "utils/formatter";

export default class FeatureLimit extends Model {
    unit() {
        switch (this.get("type")) {
            case "amount":
                return "USD";
            default:
                return "times";
        }
    }

    format(value) {
        switch (this.get("type")) {
            case "amount":
                return formatDollar(value);
            default:
                return formatValue(value);
        }
    }
}
