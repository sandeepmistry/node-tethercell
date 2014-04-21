var async = require('async');

var NobleDevice = require('noble-device');

var SERVICE_UUID       = '5ec0fff03cf2a682e2112af96efdf667';
var AUTHORIZATION_UUID = '5ec0fffc3cf2a682e2112af96efdf667';
var FET_STATE_UUID     = '5ec0fff23cf2a682e2112af96efdf667';
var VOLTAGE_UUID       = '5ec0fff33cf2a682e2112af96efdf667';

var Tethercell = function(peripheral) {
  NobleDevice.call(this, peripheral);
};

Tethercell.SCAN_UUIDS = [SERVICE_UUID];

Tethercell.is = function(peripheral) {
  return (peripheral.advertisement.localName === undefined);
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

Tethercell.prototype.readFetState = function(callback) {
  this.readServiceDataCharacteristic(FET_STATE_UUID, function(data) {
    callback(data);
  }.bind(this));
};

Tethercell.prototype.writeFetState = function(on, callback) {
  var data = new Buffer([on ? 0x01 : 0x00]);

  this.writeServiceDataCharacteristic(FET_STATE_UUID, data, callback);
};

Tethercell.prototype.turnOn = function(callback) {
  this.writeFetState(true, callback);
};

Tethercell.prototype.turnOff = function(callback) {
  this.writeFetState(false, callback);
};

Tethercell.prototype.isOn = function(callback) {
  this.readFetState(function(data) {
    callback(data[0] ? true : false);
  }.bind(this));
};

Tethercell.prototype.readVoltage = function(callback) {
  this.readUInt16LECharacteristic(SERVICE_UUID, VOLTAGE_UUID, function(value) {
    var voltage = 1.36 * (value / 1662.0);

    callback(voltage);
  }.bind(this));
};

module.exports = Tethercell;
