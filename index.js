var five = require('johnny-five');
var raspi = require('raspi-io');

var Device = require('losant-mqtt').Device;

// Construct Losant device.
var device = new Device({
  id: 'my-device-id',
  key: 'my-access-key',
  secret: 'my-access-secret'
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

  // When the button is pressed.
  button.on('down', function() {

    // Send state to Losant.
    device.sendState({ button: true });
  });
});