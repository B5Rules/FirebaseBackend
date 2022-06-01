import { getDistanceBetweenPoints } from "../screens/MapHomeScreen";
import { fireFunc } from "../globals/firebase";
import { httpsCallable } from "firebase/functions";

const getAllStationsData = httpsCallable(fireFunc, "getAllStationsData");
const getDistanceBetweenTwoStations = httpsCallable(fireFunc, "getDistanceBetweenTwoStations");
const carRange = 100000, maxCarRange = 150000; //astea sunt in metri
let stationsOnPath=0;

export const routeCalculator = async (startingPoint, destinationPoint) => {
    console.log('Route calculator endpoint hit')
    const response = await getAllStationsData();
    // const stations = response.data.result;
    // let graph = new Array(1000);
    // for (let i = 0; i < 1000; i++)
    //     graph[i] = new Array(1000);
    // let id = new Map();
    // let stationsId = [];
    // let nr = 0;

    // if(await getDistanceBetweenPoints(startingPoint,destinationPoint)<=carRange){
    //     console.log("Ajung direct!");
    //     return;
    // }
    // for (const station of stations) {
    //     //console.log(station.coordinates._latitude, station.coordinates._longitude);
    //     nr++; id[station.coordinates._latitude, station.coordinates._longitude, station.id] = nr;
    //     stationsId[nr] = [station.coordinates._latitude, station.coordinates._longitude, station.id];
    // }
    // //nu uit sa dau clear la ce am bagat in graph
    // for(let i=1;i<=999;i++)
    // graph[nr+1][i]=99999999,graph[i][nr+1]=99999999,graph[nr+2][i]=99999999,graph[i][nr+2]=99999999;
    
    // //console.log(await getDistanceBetweenPoints(startingPoint,[stationsId[6][0],stationsId[6][1]]));
    // for (const station of stations) {
    //     const id1=id[station.coordinates._latitude, station.coordinates._longitude, station.id];
    //     const dist1=await getDistanceBetweenPoints(startingPoint, {
    //         latitude: station.coordinates._latitude,
    //         longitude: station.coordinates._longitude,
    //       });
    //     const dist2=await getDistanceBetweenPoints(destinationPoint, {
    //         latitude: station.coordinates._latitude,
    //         longitude: station.coordinates._longitude,
    //       });
    //     if (dist1 <= carRange)
    //         graph[nr + 1][id1] = dist1,graph[id1][nr+1] = dist1;
    //     else
    //         graph[nr + 1][id1] = 99999999,graph[id1][nr+1] = 99999999;
    //     if (dist2 <= maxCarRange)
    //         graph[id1][nr+2] = dist2,graph[nr+2][id1]=dist2;
    //     else
    //         graph[id1][nr+2] = 99999999,graph[nr+2][id1]=99999999;
    // }
    
    // console.log("Aici2");
    // let shortestDistances = new Array (nr+4);
    // let added=new Array(nr+4);
    // for(let index=1;index<=nr+2;index++)
    // {
    //     shortestDistances[index]=99999999;
    //     added[index]=false;
    // }
    // shortestDistances[nr+1]=0;
    // let parents=new Array(nr+4);
    // parents[nr+1]=-1;
    // for(let i=1;i<=nr+2;i++)
    // if(i!=nr+1){
    //     let nearestVertex=-1;
    //     let shortestDistance=99999999;
    //     for(let index=1;index<=nr+2;index++)
    //     if(!added[index]&& shortestDistances[index]<shortestDistance){
    //         nearestVertex=index;
    //         shortestDistance=shortestDistances[index];
    //     }
    //     added[nearestVertex]=true;
    //     for(let index=1;index<=nr+2;index++){
    //         let edgeDistance=0;
    //         if(index==nr+1 || index==nr+2 || nearestVertex==nr+1 || nearestVertex==nr+2)
    //             edgeDistance=graph[nearestVertex][index];
    //         else
    //             edgeDistance= await getDistanceBetweenTwoStations({ 
    //                 station1: stationsId[nearestVertex][2], 
    //                 station2: stationsId[index][2]
    //             });

    //         if(edgeDistance>0 && ((shortestDistance+edgeDistance)<shortestDistances[index])){
    //             parents[index]=nearestVertex;
    //             shortestDistances[index]=shortestDistance+edgeDistance;
    //         }
    //     }
    // }
    // console.log("Aici3");
    // let distance=shortestDistances[nr+2];
    // if(distance==99999999)
    // {
    //     console.log("Nu se poate face drumul!");
    //     return;
    // }
    // let path=new Array(1000);
    // printPath(nr+2,parents,path,1);
    // console.log("Aici4");
    // console.log(stationsOnPath);
    // let listOfCoordonates=[];
    // for(let i=stationsOnPath;i>=1;i--)
    // if(path[i]==nr+2)
    // listOfCoordonates.push(destinationPoint);
    // else
    // if(path[i]==nr+1)
    // listOfCoordonates.push(startingPoint);
    // else
    // listOfCoordonates.push({latitude: stationsId[path[i]][0], longitude: stationsId[path[i]][1]});
    
    return [
        {
          latitude: 47.155611854999194,
          longitude: 27.589531503617764
        }
    ]
}

function printPath(index,parents,path,now){
    if(index==-1)
    return;
    stationsOnPath++;
    printPath(parents[index],parents,path,now+1);
    path[now]=index;
    //console.log(index+" ");
}