import { getDistanceBetweenPoints } from "../screens/MapHomeScreen";
import { fireFunc } from "../globals/firebase";
import { httpsCallable } from "firebase/functions";

const getAllStationsData = httpsCallable(fireFunc, "getAllStationsData");
const carRange = 300, maxCarRange = 500;

export const routeCalculator = async (startingPoint, destinationPoint) => {
    const response = await getAllStationsData();
    const stations = response.data.result;

    for(const station of stations) {
        console.log(station.coordinates._latitude, station.coordinates._longitude);
    }
    console.log(startingPoint, destinationPoint);


    return {
        listOfCoordonates: [],
        duration: 0,
        distance: 0,
    }
}