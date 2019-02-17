'use strict';

require("babel-core/register");
require("babel-polyfill");

import DistanceMatrixService from './services/distanceMatrix';
import autocompleteService from './services/autocompleteService';

const pickupField = document.querySelector('.pickup');
const dropoffField = document.querySelector('.dropoff');
const calcButton = document.querySelector('.calculate');
const garage = "5320 W Lawrence Ave #211, Chicago, IL 60630, USA";

document.addEventListener("DOMContentLoaded", () => {
  
 const autocomplete = new autocompleteService(pickupField, dropoffField);
  
  const autocompletePickup = autocomplete.pickupAutocomplete;
  const autocompleteDropoff = autocomplete.dropoffAutocomplete;

  calcButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const pickupInfo =  await autocompletePickup.getPlace();
    const dropoffInfo =  await autocompleteDropoff.getPlace();

    const distanceMatrix = new DistanceMatrixService(pickupInfo.formatted_address, dropoffInfo.formatted_address, garage);

    const pickup =  pickupInfo.formatted_address
    const dropoff = dropoffInfo.formatted_address

    const gtp = await distanceMatrix.getDistance(garage, pickup);
    const ptd = await distanceMatrix.getDistance(pickup, dropoff);
    const dtg = await distanceMatrix.getDistance(dropoff, garage);

    console.log(`Garage to Pickup is ${gtp}`);
    console.log(`Pickup to Geparture is ${ptd}`)
    console.log(`Departure to Garage is ${dtg}`)
  });
});


if ( module.hot ) {
  module.hot.accept(function () {
    window.location.reload();
  });
}