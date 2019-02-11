'use strict';

document.addEventListener("DOMContentLoaded", () => {

  const pickupField = document.querySelector('.pickup');
  const dropoffField = document.querySelector('.dropoff');
  const calcButton = document.querySelector('.calculate');

  const autocompletePickup = autocompleteForm(pickupField);

  const autocompleteDropoff = autocompleteForm(dropoffField);

  calcButton.addEventListener('click', (event) => {
    event.preventDefault();
    const pickupInfo = autocompletePickup.getPlace();
    const dropoffInfo = autocompleteDropoff.getPlace();
    console.log(pickupInfo);
    console.log(dropoffInfo);
  });
});

const autocompleteForm = (formField) => {
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