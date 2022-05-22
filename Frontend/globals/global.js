import {createGlobalState} from 'react-hooks-global-state';

const {setGlobalState, getGlobalState} = createGlobalState({
    userData: {
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        uid: '',
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
    providerStationData: {
        userID: '',
        type: 0,
        services: [],
        price: 0,
        name: '',
        id: '',
        coordinates: {
            lat: 0,
            long: 0,
        }
    },
    providerStationDataButtonClicked: false,
});

export {setGlobalState, getGlobalState};

