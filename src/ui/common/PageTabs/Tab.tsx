import React from "react";

import styled from "styled-components";

const RegularTab = styled.div`
    background-color: #454;
    color: white;
    margin: 2px;
    padding: 2px;
    border: 1px solid black;

    &:hover {
        background-color: #459;
    }
`;

const SelectedTab = styled.div`
    background-color: #696;
    color: blue;
    font-weight: bold;

    margin: 2px;
    padding: 2px;
    border: 1px solid black;
`;

export function Tab(props: { title: string, isSelected: boolean, go: () => void }) {
    const { title, go, isSelected } = props;

    return isSelected ?
        <SelectedTab>
            {title}
        </SelectedTab> :
        <RegularTab onClick={go}>
            {title}
        </RegularTab>;
}