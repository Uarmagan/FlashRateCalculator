'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const pickupField = document.getElementById('pickup');
  const dropoffField = document.getElementById('dropoff');

  const autocompletePickup = autocompleteForm(pickupField);

  const autocompleteDropoff = autocompleteForm(dropoffField);

  autocompletePickup.addListener('place_changed', () => {
    const pickupInfo = autocompletePickup.getPlace();
    console.log(pickupInfo)
  })
});

const autocompleteForm  = (formField) => {
  const selection = new google.maps.places.Autocomplete((formField), {
    latLngBounds:{north: 41, south: 52, west: 87, east: 23} ,
    strictBounds:true,
    componentRestrictions: {country: 'us'}
  });
  return selection;
}

