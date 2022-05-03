import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState } = createGlobalState({
    data:{
        username: "",
        email: "",
        lastName: "",
        firstName: "",
        phone: ""
        //country: "",
        //lastTransaction: "",
    },
    needReload: true
});

export { useGlobalState, setGlobalState};