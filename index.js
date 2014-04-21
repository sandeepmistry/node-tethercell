var async = require('async');

var NobleDevice = require('noble-device');

var SERVICE_UUID       = '5ec0fff03cf2a682e2112af96efdf667';
var AUTHORIZATION_UUID = '5ec0fffc3cf2a682e2112af96efdf667';
var FET_STATE_UUID     = '5ec0fff23cf2a682e2112af96efdf667';

var Tethercell = function(peripheral) {
  NobleDevice.call(this, peripheral);
};

Tethercell.SCAN_UUIDS = [SERVICE_UUID];

Tethercell.is = function(peripheral) {
  return (peripheral.advertisement.localName === undefined) /*&& 
          (peripheral.advertisement.serviceUuids === [SERVICE_UUID])*/;
};

NobleDevice.Util.inherits(Tethercell, NobleDevice);
NobleDevice.Util.mixin(Tethercell, NobleDevice.DeviceInformationService);

Tethercell.prototype.writeServiceDataCharacteristic = function(uuid, data, callback) {
  this.writeDataCharacteristic(SERVICE_UUID, uuid, data, callback);
};

Tethercell.prototype.readServiceDataCharacteristic = function(uuid, callback) {
  this.readDataCharacteristic(SERVICE_UUID, uuid, callback);
};

Tethercell.prototype.authorize = function(pin, callback) {
  this.writeServiceDataCharacteristic(AUTHORIZATION_UUID, new Buffer(pin, 'hex'), callback);
};

Tethercell.prototype.setFetState = function(on, callback) {
  var data = new Buffer([on ? 0x01 : 0x00]);

  this.writeServiceDataCharacteristic(FET_STATE_UUID, data, callback);
};

Tethercell.prototype.turnOn = function(callback) {
  this.setFetState(true, callback);
};

Tethercell.prototype.turnOff = function(callback) {
  this.setFetState(false, callback);
};


// DeviceFactory1.prototype.setLed = function(red, green, blue, callback) {
//   var value = 0x00;

//   if (red) {
//     value |= 0x01;
//   }

//   if (green) {
//     value |= 0x02;
//   }

//   if (blue) {
//     value |= 0x04;
//   }

//   this.writeDataCharacteristic(TEST_SERVICE_UUID, LED_UUID, new Buffer([value]), callback);
// };

module.exports = Tethercell;
