node-tethercell
===============

node.js lib for the [Tethercell](http://tetherboard.com)

Install
-------

    npm install tethercell

Usage
-----

    var Tethercell = require('tethercell');

__Discover__

    Tethercell.discover(callback(tethercell));

__Connect and Setup (discover services and characteristics)__

    tethercell.connectAndSetup(callback);

__Disconnect__

    tethercell.disconnect(callback);

__Authorize__

    var pin = '00000000';

    tethercell.authorize(pin, callback);

__Turn on/off, is on__

    tethercell.turnOn(callback);

    tethercell.turnOff(callback);

    tethercell.isOn(callback(isOn));

__Voltage__

    tethercell.readVoltage(callback(voltage));

__Device Name__

    tethercell.readDeviceName(callback(deviceName));

    var deviceName = 'TETHERCELL ONE';

    tethercell.writeDeviceName(deviceName, callback);
