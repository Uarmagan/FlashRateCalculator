export default class DistanceMatrixService {
    constructor(pickup, dropoff, garage){
        this.pickup = pickup;
        this.dropoff = dropoff;
        this.garage = garage;
        this.distance = new google.maps.DistanceMatrixService()
    }

    async getDistance(arg1, arg2) {
        this.distance.getDistanceMatrix({
        origins: [arg1],
        destinations: [arg2],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, response => {
          console.log(response)
          return response.rows[0].elements[0].distance.text}
          
        );
    }
    
}