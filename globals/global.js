import {createGlobalState} from 'react-hooks-global-state';

const {setGlobalState, getGlobalState} = createGlobalState({
    userData: {
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
    },
    needUpdate: true,
    kwhToCharge: -1,
    currentStationData:{
        id:'',
        owneruid:'',
        lat: 0,
        long: 0,
        price: 0,
        service_flags: [],
        type: "",
    },

});

export {setGlobalState, getGlobalState};

