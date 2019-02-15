'use strict';

import DistanceMatrixService from './services/distanceMatrix';
import autocompleteService from './services/autocompleteService';

const pickupField = document.querySelector('.pickup');
const dropoffField = document.querySelector('.dropoff');
const calcButton = document.querySelector('.calculate');
const office = "5320 W Lawrence Ave #211, Chicago, IL 60630, USA";

var pickupInfo;
var dropoffInfo;


document.addEventListener("DOMContentLoaded", () => {
  
 const autocomplete = new autocompleteService(pickupField, dropoffField);
  
  const autocompletePickup = autocomplete.pickupAutocomplete;
  const autocompleteDropoff = autocomplete.dropoffAutocomplete;
  const distanceService = new google.maps.DistanceMatrixService();

  calcButton.addEventListener('click', (event) => {
    event.preventDefault();
    pickupInfo = autocompletePickup.getPlace();
    dropoffInfo = autocompleteDropoff.getPlace();
    console.log(pickupInfo);
    console.log(dropoffInfo);

    const origin = pickupInfo.formatted_address;
    const destination = dropoffInfo.formatted_address;

    distanceService.getDistanceMatrix({
      origins: [office],
      destinations: [origin],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, (response) => console.log(`garage to pickup: ${response.rows[0].elements[0].distance.text}`));

    distanceService.getDistanceMatrix({
      origins: [destination],
      destinations: [office],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, (response) => console.log(`dropoff to garage: ${response.rows[0].elements[0].distance.text}`));

    distanceService.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
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

if ( module.hot ) {
  module.hot.accept(function () {
    window.location.reload();
  });
}