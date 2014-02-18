var util = require('util');

var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;
var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

console.log('pseudo');

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising(null, ['5ec0fff03cf2a682e2112af96efdf667']);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart ' + error);

  if (!error) {
    bleno.setServices([
      new BlenoPrimaryService({
        uuid: '5ec0fff03cf2a682e2112af96efdf667',
        characteristics: [
          new BlenoCharacteristic({
            uuid: '5ec0fff13cf2a682e2112af96efdf667',
            properties: ['read'],
            onReadRequest: function(offset, callback) {
              console.log('1 onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('00000000', 'hex')); // Family
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fff23cf2a682e2112af96efdf667',
            properties: ['read', 'write'],
            onReadRequest: function(offset, callback) {
              console.log('2 onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('01', 'hex')); // FET State
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              console.log('2 onWriteRequest: ' + data.toString('hex'));

              callback(BlenoCharacteristic.RESULT_SUCCESS);
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fff33cf2a682e2112af96efdf667',
            properties: ['read'],
            onReadRequest: function(offset, callback) {
              console.log('3 onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('af05', 'hex')); // Battery Voltage
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fff43cf2a682e2112af96efdf667',
            properties: ['read', 'write'],
            onReadRequest: function(offset, callback) {
              console.log('4 onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('0000000000000000000000000', 'hex')); // Timers
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              console.log('4 onWriteRequest: ' + data.toString('hex'));

              callback(BlenoCharacteristic.RESULT_SUCCESS);
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fff53cf2a682e2112af96efdf667',
            properties: ['read', 'write'],
            onReadRequest: function(offset, callback) {
              console.log('5 onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('00', 'hex')); // Timer access index
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              console.log('5 onWriteRequest: ' + data.toString('hex'));

              callback(BlenoCharacteristic.RESULT_SUCCESS);
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fff63cf2a682e2112af96efdf667',
            properties: ['read'],
            onReadRequest: function(offset, callback) {
              console.log('6 onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('0100', 'hex')); // Battery Voltage Most Recent Index
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fff73cf2a682e2112af96efdf667',
            properties: ['read'],
            onReadRequest: function(offset, callback) {
              console.log('7 onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('', 'hex')); // Battery Voltage History
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fff83cf2a682e2112af96efdf667',
            properties: ['read', 'write'],
            onReadRequest: function(offset, callback) {
              console.log('8 onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('00000000', 'hex')); // Password
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              console.log('8 onWriteRequest: ' + data.toString('hex'));

              callback(BlenoCharacteristic.RESULT_SUCCESS);
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fff93cf2a682e2112af96efdf667',
            properties: ['read', 'write'],
            onReadRequest: function(offset, callback) {
              console.log('9 onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('TEHTERCELL ONE\0\0', 'hex')); // Device name
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              console.log('9 onWriteRequest: ' + data.toString('hex'));

              callback(BlenoCharacteristic.RESULT_SUCCESS);
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fffa3cf2a682e2112af96efdf667',
            properties: ['read', 'write'],
            onReadRequest: function(offset, callback) {
              console.log('a onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('71170000', 'hex')); // UTC Time
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              console.log('a onWriteRequest: ' + data.toString('hex'));

              // 80610253
              // 53 02 61 80
              // in seconds

              callback(BlenoCharacteristic.RESULT_SUCCESS);
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fffb3cf2a682e2112af96efdf667',
            properties: ['read', 'write'],
            onReadRequest: function(offset, callback) {
              console.log('b onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('0019', 'hex')); // Advertising Period in s
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              console.log('b onWriteRequest: ' + data.toString('hex'));

              callback(BlenoCharacteristic.RESULT_SUCCESS);
            }
          }),
          new BlenoCharacteristic({
            uuid: '5ec0fffc3cf2a682e2112af96efdf667',
            properties: ['read', 'write'],
            onReadRequest: function(offset, callback) {
              console.log('c onReadRequest');

              callback(BlenoCharacteristic.RESULT_SUCCESS, new Buffer('', 'hex')); // Authorization
            },
            onWriteRequest: function(data, offset, withoutResponse, callback) {
              console.log('c onWriteRequest: ' + data.toString('hex'));

              callback(BlenoCharacteristic.RESULT_SUCCESS);
            }
          }),
        ]
      })
    ]);
  }
});

bleno.on('advertisingStop', function() {
  console.log('on -> advertisingStop');
});

bleno.on('servicesSet', function() {
  console.log('on -> servicesSet');
});
