export const routes = {
    login: {
        path: "/login",
        isPrivate: false,
        title: "Вход"
    },
    notes: {
        path: "/notes",
        isPrivate: true,
        title: "Заметки"
    },
    licenses: {
        path: "/licenses",
        isPrivate: false,
        title: "Лицензии"
    }
};

export const routesList = [
    routes.login,
    routes.notes,
    routes.licenses
];
