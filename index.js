let five = require('johnny-five');
let raspi = require('raspi-io');
import { myDeviceId, myAccessKey, myAccessSecret } from 'keys'

let Device = require('losant-mqtt').Device;

// Construct Losant device.
let device = new Device({
  id: myDeviceId,
  key: myAccessKey,
  secret: myAccessSecret
});

// Connect the device to Losant.
device.connect();

var board = new five.Board({
  io: new raspi()
});


board.on('ready', function() {

  // LED connected to GPIO pin 23.
  var led = new five.Led('GPIO23');

  // Button connected to GPIO 21.
  var button = new five.Button('GPIO21');

  // Hook the command event listener.
  device.on('command', function(command) {
    if(command.name === 'toggle') {
      led.toggle();
    }
  });
});