import React, { Dispatch } from "react";

import { routesList } from "routes";

import { connect, withRouter, css } from "hocs";

import { AuthModule } from "modules";
import { push, RouterState } from "connected-react-router";
import { Tab } from "./Tab";

export interface PageTabsProps {
    className?: string;
    isAuthorized?: string;
    router?: RouterState;
    dispatch?: Dispatch<any>;
}

@css`
    background-color: #131;
    color: #ddf;
    display: flex;
`
@withRouter
@connect((state: any) => ({
    isAuthorized: AuthModule.selectIsAuthorized(state)
}), (dispatch: Dispatch<any>) => ({
    dispatch
}))
export class PageTabs extends React.Component<PageTabsProps> {
    render() {
        const { className, isAuthorized, router, dispatch } = this.props;
        return <div className={className}>
            {routesList.map(({ path, isPrivate, title }) => {
                const isSelected = router.location.pathname === path;
                if (isPrivate && !isAuthorized) {
                    return null;
                }

                const go = () => dispatch(push(path));

                return <Tab title={title} isSelected={isSelected} go={go} />;
            })}
        </div>;
    }
}