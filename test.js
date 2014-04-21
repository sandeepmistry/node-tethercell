var async = require('async');

var Tethercell = require('./index');

Tethercell.discover(function(tethercell) {
  console.log('found ' + tethercell.uuid);

  tethercell.on('disconnect', function() {
    console.log('disconnected!');
    process.exit(0);
  });

  async.series([
      function(callback) {
        console.log('connectAndSetup');
        tethercell.connectAndSetup(callback);
      },
      function(callback) {
        console.log('readDeviceName');
        tethercell.readDeviceName(function(deviceName) {
          console.log('\tdevice name = ' + deviceName);
          callback();
        });
      },
      function(callback) {
        console.log('readModelNumber');
        tethercell.readModelNumber(function(modelNumber) {
          console.log('\tmodel name = ' + modelNumber);
          callback();
        });
      },
      function(callback) {
        console.log('readSerialNumber');
        tethercell.readSerialNumber(function(serialNumber) {
          console.log('\tserial name = ' + serialNumber);
          callback();
        });
      },
      function(callback) {
        console.log('readFirmwareRevision');
        tethercell.readFirmwareRevision(function(firmwareRevision) {
          console.log('\tfirmware revision = ' + firmwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readHardwareRevision');
        tethercell.readHardwareRevision(function(hardwareRevision) {
          console.log('\thardware revision = ' + hardwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readSoftwareRevision');
        tethercell.readSoftwareRevision(function(softwareRevision) {
          console.log('\tsoftware revision = ' + softwareRevision);
          callback();
        });
      },
      function(callback) {
        console.log('readManufacturerName');
        tethercell.readManufacturerName(function(manufacturerName) {
          console.log('\tmanufacturer name = ' + manufacturerName);
          callback();
        });
      },
      function(callback) {
        var pin = '00000000';

        console.log('authorize: ' + pin);
        tethercell.authorize(pin, callback);
      },
      function(callback) {
        console.log('turnOff');
        tethercell.turnOff(function() {
          setTimeout(callback, 5000);
        });
      },
      function(callback) {
        console.log('turnOn');
        tethercell.turnOn(function() {
          setTimeout(callback, 5000);
        });
      },
      function(callback) {
        console.log('turnOff');
        tethercell.turnOff(function() {
          setTimeout(callback, 5000);
        });
      },
      function(callback) {
        console.log('disconnect');
        tethercell.disconnect(callback);
      }
    ]
  );
});