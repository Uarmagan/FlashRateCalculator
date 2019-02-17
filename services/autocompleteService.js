export default class autocompleteService {
    constructor(pickup, dropoff){
        this.pickup = pickup;
        this.dropoff = dropoff;
    }
    get pickupAutocomplete(){
        return autocomplete(this.pickup);
    }
    get dropoffAutocomplete(){
        return autocomplete(this.dropoff);
    }
    
}
const autocomplete = (formField) => {
    const selection = new google.maps.places.Autocomplete((formField), {
        latLngBounds: {
          north: 41,
          south: 52,
          west: 87,
          east: 23
        },
        strictBounds: true,
        componentRestrictions: {
          country: 'us'
        }
      });
      return selection;
}