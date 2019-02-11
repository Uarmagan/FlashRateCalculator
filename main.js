'use strict';

document.addEventListener("DOMContentLoaded", () => {
  require('dotenv').config();
  const pickupAutocompleteForm = document.getElementById('pickup');
  const dropoffAutocompleteForm = document.getElementById('dropoff');
  const API_KEY = process.env.GO_FLASH_API; 

  // const script = document.createElement('script'); 
  // script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
  // document.body.append(script);
  console.log(`api key is ${API_KEY}`)

  const autocompletePickup = new google.maps.places.Autocomplete((pickupAutocompleteForm), {
      latLngBounds:{north: 41, south: 52, west: 87, east: 23} ,
      strictBounds:true,
      componentRestrictions: {country: 'us'}
    });

    const autocompleteDropoff = new google.maps.places.Autocomplete((dropoffAutocompleteForm), {
      latLngBounds:{north: 41, south: 52, west: 87, east: 23},
      strictBounds:true,
      componentRestrictions: {country: 'us'}
    });

    autocompletePickup.addListener('place_changed', () => {
      const pickupInfo = autocompletePickup.getPlace();
      console.log(pickupInfo)
    })
});

