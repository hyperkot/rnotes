import React from "react";
import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    div, input {
        flex-basis: 50%;
    }
`;

export const Divider = styled.div`
    min-height: 20px;
`;