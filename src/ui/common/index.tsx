import React from "react";
import styled from "styled-components";

export { AppTitle } from "./AppTitle";
export { Loading } from "./Loading/Loading";;

export const PageWrapper = styled.div`
    background-color: #335;
    border: none;
    padding: none;
    margin: none;
    color: white;
    min-height: 100vh;
`;

export const PageBlock = styled.div`
    background-color: #222;
    margin: 2px;
    padding: 4px;
`;

export const PageBlockTitle = styled.div`
    background-color: #345;
    color: #dff;
    font-size: 16px;
    font-weight: bold;
    padding: 4px;
    text-decoration: underline;
    margin-bottom: 10px;
`;

export const PageCenteredBlock = styled(PageBlock)`
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    width: 400px;
`;

export const ErrorMessageWrapper = styled.div`
    background-color: #600;
    color: white;
    font-weight: bold;
`;

export const ErrorMessage = ({ error }: { error: string }) => {
    return error ? (<ErrorMessageWrapper> {error} </ErrorMessageWrapper>) : null;
}