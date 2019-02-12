'use strict';

document.addEventListener("DOMContentLoaded", () => {

  const pickupField = document.querySelector('.pickup');
  const dropoffField = document.querySelector('.dropoff');
  const calcButton = document.querySelector('.calculate');

  var pickupInfo;
  var dropoffInfo;

  const autocompletePickup = autocompleteForm(pickupField);
  const autocompleteDropoff = autocompleteForm(dropoffField);
  const distanceService = new google.maps.DistanceMatrixService();

  calcButton.addEventListener('click', (event) => {
    event.preventDefault();
    pickupInfo = autocompletePickup.getPlace();
    dropoffInfo = autocompleteDropoff.getPlace();
    console.log(pickupInfo);
    console.log(dropoffInfo);

    var origin1 = pickupInfo.formatted_address;
    var destinationA = dropoffInfo.formatted_address;

    
    distanceService.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL
      }, distanceMatrixCallback);
    });
});

function distanceMatrixCallback(response, status) {
  let ptpDistance = response.rows[0].elements[0].distance.text
  let element = document.querySelector('.distance');
  element.textContent = ptpDistance;
}

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