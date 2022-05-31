import {createGlobalState} from 'react-hooks-global-state';

const {setGlobalState, getGlobalState} = createGlobalState({
    userData: {
        username: '',
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        uid: '',
        secKey: '',
        pubKey: ''
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
    stationChangeMode: {
        id: '',
        name: '', 
        price: 0,
        services: [],
        type: 0,
        userID: '',
        coordinates: {
            latitude: 0.0,
            longitude: 0.0,
        }
    },
    stationChangeModeActive: false,
    stationChargeModeEdit: 0, // 1 - edit, 2 - add
    carData:{
        chargingCap: 0,
    },
    cars:[],
    currentpubkey: ''
});

export {setGlobalState, getGlobalState};

