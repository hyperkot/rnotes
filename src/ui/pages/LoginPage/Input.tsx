import React from "react";
import styled from "styled-components";

import { bound } from "lib";

export interface InputProps {
    password?: boolean;
    value: string;
    label: string;
    onChange: (newValue: string) => void;
}

const InputWrapper = styled.div`
    background-color: #bda;
    border: 1px solid #ddd;
    padding: 4px;
    div {
        color: #211;
    }
    input {
        font-size: 12px;
        width: calc(100% - 8px);
    }
`;

export class Input extends React.Component<InputProps> {

    @bound
    onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(e.target.value);
    }

    render() {
        const { password, value, label } = this.props;

        return <InputWrapper>
            <div>{label}</div>
            <input type={password ? "password" : "text"} value={value} onChange={this.onChangeValue} />
        </InputWrapper>;
    }
}