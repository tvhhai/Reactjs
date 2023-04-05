import {ITooltipParams} from "ag-grid-community";
import i18n from "i18next";

/**
 *
 * @param params
 * @param nullValCustomKey {string} (Key i18n) Value tooltip custom
 */
export const tooltipValueGetter = (params: ITooltipParams, nullValCustomKey: string) => {
    return nullValCustomKey ? i18n.t(nullValCustomKey) : params.valueFormatted
};