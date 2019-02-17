'use strict';

require("babel-core/register");
require("babel-polyfill");

import DistanceMatrixService from './services/distanceMatrix';
import autocompleteService from './services/autocompleteService';

const pickupField = document.querySelector('.pickup');
const dropoffField = document.querySelector('.dropoff');
const calcButton = document.querySelector('.calculate');
const garage = "5320 W Lawrence Ave #211, Chicago, IL 60630, USA";
var distances = {}
var pickupInfo;
var dropoffInfo;


document.addEventListener("DOMContentLoaded", () => {
  
 const autocomplete = new autocompleteService(pickupField, dropoffField);
  
  const autocompletePickup = autocomplete.pickupAutocomplete;
  const autocompleteDropoff = autocomplete.dropoffAutocomplete;

  calcButton.addEventListener('click', async (event) => {
    event.preventDefault();
    pickupInfo =  autocompletePickup.getPlace();
    dropoffInfo =  autocompleteDropoff.getPlace();
    console.log(pickupInfo);
    console.log(dropoffInfo);

    const distanceMatrix = new DistanceMatrixService(pickupInfo.formatted_address, dropoffInfo.formatted_address, garage)
    const pickup =  pickupInfo.formatted_address
    const dropoff = dropoffInfo.formatted_address
    console.log(pickup)
    console.log(dropoff)


    const gtp = await distanceMatrix.getDistance(garage, pickup);
    const ptd = await distanceMatrix.getDistance(pickup, dropoff);
    const dtg = await distanceMatrix.getDistance(dropoff, garage);

    await console.log(gtp)
    await console.log(ptd)
    // distances = {
    //   garageToPickup: await distanceMatrix.getDistance(garage, pickup),
    //   pickupToDropoff: await distanceMatrix.getDistance(pickup, dropoff),
    //   dropoffToGarage: await distanceMatrix.getDistance(dropoff, garage)
    // }
  
    console.log(distances)
  });
});


if ( module.hot ) {
  module.hot.accept(function () {
    window.location.reload();
  });
}