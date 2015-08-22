# node-tethercell

[![Analytics](https://ga-beacon.appspot.com/UA-56089547-1/sandeepmistry/node-tethercell?pixel)](https://github.com/igrigorik/ga-beacon)

Node.js lib for the [Tethercell](http://tetherboard.com)

## Install

```sh
npm install tethercell
```

## Usage

```javascript
var Tethercell = require('tethercell');
```

__Discover__

```javascript
Tethercell.discover(callback(tethercell));
```

__Connect and Setup (discover services and characteristics)__

```javascript
tethercell.connectAndSetup(callback(error));
```

__Disconnect__

```javascript
tethercell.disconnect(callback);
```

__Authorize__

```javascript
var pin = '00000000';

tethercell.authorize(pin, callback(error));
```

__Turn on/off, is on__

```javascript
tethercell.turnOn(callback(error));

tethercell.turnOff(callback(error));

tethercell.isOn(callback(error, isOn));
```

__Voltage__

```javascript
tethercell.readVoltage(callback(error, voltage));
```

__Device Name__

```javascript
tethercell.readDeviceName(callback(error, deviceName));

var deviceName = 'TETHERCELL ONE';

tethercell.writeDeviceName(deviceName, callback(error));
```
