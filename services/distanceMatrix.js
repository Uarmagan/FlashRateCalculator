"use strict";
export default class DistanceMatrixService {
    constructor(pickup, dropoff, garage){
        this.pickup = pickup;
        this.dropoff = dropoff;
        this.garage = garage;
        this.distance = new google.maps.DistanceMatrixService()
    }

    getDistance(arg1, arg2) {
        return new Promise((resolve, reject) => {
            try{
                this.distance.getDistanceMatrix({
                origins: [arg1],
                destinations: [arg2],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL
            }, response => {
                console.log(response)
                resolve(response.rows[0].elements[0].distance.text)
            }
                
                );
            } catch(e){
                console.error(`error: ${e.message}`)
            }
        });
    }
    
}