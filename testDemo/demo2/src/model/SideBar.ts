import {ReactNode} from "react";

export interface ISideBarItem {
    url: string,
    icon: ReactNode,
    i18nKey: string
}

export interface ISideBarItemCollapse {
    active: boolean,
    expand: boolean,
    icon: ReactNode,
    i18nKey: string,
    child: {
        i18nKey: string, url: string
    }[]
}