import * as React from "react";
import { Dispatch } from "redux";

import { connect } from "hocs/connect";
import { PageWrapper, AppTitle, PageBlock, PageBlockTitle, PageCenteredBlock, Loading, ErrorMessage } from "ui/common";
import { LoginUIModule, AuthModule } from "modules";
import { bound } from "lib";

import { Row, Divider } from "./Row";
import { Input } from "./Input";
import { PageTabs } from "ui/common/PageTabs/PageTabs";

export interface LoginPageProps {
    name?: string;
    password?: string;
    setName?: (value: string) => any;
    setPassword?: (value: string) => any;
    register?: (name: string, password: string) => any;
    login?: (name: string, password: string) => any;
    logout?: () => any;
    error?: string;
    loading?: boolean;
    isDataValid?: boolean;
    isAuthorized?: boolean;
    authorizedUserName?: string;
}

@connect(
    (state: any) => ({
        name: LoginUIModule.selectName(state),
        password: LoginUIModule.selectPassword(state),
        error: AuthModule.selectError(state),
        loading: AuthModule.selectIsLoading(state),
        isDataValid: LoginUIModule.selectDataValid(state),
        isAuthorized: AuthModule.selectIsAuthorized(state),
        authorizedUserName: AuthModule.selectUserName(state)
    }),
    (dispatch: Dispatch) => ({
        setName: (name: string) => dispatch(LoginUIModule.setNameAction(name)),
        setPassword: (password: string) => dispatch(LoginUIModule.setPasswordAction(password)),
        register: (name: string, password: string) => {
            dispatch(AuthModule.registerAction(name, password) as any);
        },
        login: (name: string, password: string) => {
            dispatch(AuthModule.loginAction(name, password) as any);
        },
        logout: () => {
            dispatch(AuthModule.logoutAction())
        }
    })
)
export class LoginPage extends React.Component<LoginPageProps> {

    @bound
    onClickRegister(e: React.SyntheticEvent) {
        const { register, name, password } = this.props;
        register(name, password);
    }

    @bound
    onClickLogin(e: React.SyntheticEvent) {
        const { login, name, password } = this.props;
        login(name, password);
    }

    render() {
        const { name, password, loading, isDataValid, error, isAuthorized, setPassword, setName, authorizedUserName, logout } = this.props;
        return <PageWrapper>
            <AppTitle />
            <PageTabs />
            <PageCenteredBlock>
                <PageBlockTitle>
                    Авторизация
                </PageBlockTitle>
                {(!isAuthorized)
                    ? <Loading loading={loading}>
                        <form>
                            <Row>
                                <Input value={name} label="Логин" onChange={setName} />
                                <Input password value={password} label="Пароль" onChange={setPassword} />
                            </Row>
                            <ErrorMessage error={error || (!isDataValid && "Длинна пароля и логина должна быть не менее 2х символов")} />
                            <Divider />
                            <Row>
                                <input type="button" disabled={!isDataValid} value="Зарегистрироваться" onClick={this.onClickRegister}></input>
                                <input type="button" value="Войти" disabled={!isDataValid} onClick={this.onClickLogin}></input>
                            </Row>
                        </form>
                    </Loading>
                    : <>
                        <div> Вы авторизованы как {authorizedUserName} </div>
                        <input type="button" value="Выйти" onClick={logout}></input>
                    </>
                    
                }

            </PageCenteredBlock>
        </PageWrapper>;
    }
}
