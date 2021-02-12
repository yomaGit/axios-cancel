# axios-cancel

Simplify Axios cancellation request when using [Axios](https://www.kancloud.cn/yunye/axios/234845) Library

## Installation

`npm install axios-cancel-plugin --save`

## Getting started

```javascript
import axios from 'axios';
import axiosCancel from 'axios-cancel-plugin';

axiosCancel(axios, {
  debug: false // default
});

// Single cancellation request (get)
const requestId = 'requestId';
axios.get(url, {
  requestId: requestId
})
  .then(res => {
    console.log('resolved');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled');
    } else {
      console.log('some other reason');
    }
  });

axios.cancel(requestId);

...

// Single cancellation request (post)
const requestId = 'requestId';
const promise = axios.post(url, {}, {
  requestId: requestId
})
  .then(res => {
    console.log('resolved');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled');
    } else {
      console.log('some other reason');
    }
  });

axios.cancel(requestId);
```

## Examples

```javascript
const requestId = 'requestId';
const promise1 = axios.get(url, {
  requestId: requestId
})
  .then(res => {
    console.log('resolved promise 1');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request 1 cancelled');
    } else {
      console.log('some other reason');
    }
  });

// another request with same `requestId`, before `promise1` resolution
const promise2 = axios.get(url, {
  requestId: requestId
})
  .then(res => {
    console.log('resolved promise 2');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request 2 cancelled');
    } else {
      console.log('some other reason');
    }
  });

// aborts the first HTTP request, and cancels the first promise 
// logs `request 1 cancelled`
// logs `resolved promise 2`
```
Multiple requests with different `requestId`, cancell all
```javascript

const requestId1 = 'requestId1';
const promise1 = axios.get(url, {
  requestId: requestId1
})
  .then(res => {
    console.log('resolved promise 1');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request 1 cancelled');
    } else {
      console.log('some other reason');
    }
  });

const requestId2 = 'requestId2';
const promise2 = axios.get(url, {
  requestId: requestId2
})
  .then(res => {
    console.log('resolved promise 1');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request 2 cancelled');
    } else {
      console.log('some other reason');
    }
  });

axios.cancelAll();

// aborts all HTTP request, and cancels all promises
// logs `request 1 cancelled`
// logs `request 2 cancelled`

```

## Methods

*axiosCancel(instance: axios[, options])*

*options*
- debug _(enables logging)_

*axios.cancel(requestId: string[, reason: string])*

*axios.cancelAll([reason: string])*

## License

MIT
