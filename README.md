# axios-cancel-plugin

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
    console.log('resolved get');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled get');
    } else {
      console.log('some other reason get');
    }
  });

axios.cancel(requestId);

// aborts the HTTP request, and cancels the promise
// logs `request cancelled get`
...

// Single cancellation request (post)
const requestId = 'requestId';
const promise = axios.post(url, {}, {
  requestId: requestId
})
  .then(res => {
    console.log('resolved post');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled post');
    } else {
      console.log('some other reason post');
    }
  });

axios.cancel(requestId);

// aborts the HTTP request, and cancels the promise
// logs `request cancelled post`
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
      console.log('request cancelled 1');
    } else {
      console.log('some other reason 1');
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
      console.log('request cancelled 2');
    } else {
      console.log('some other reason 2');
    }
  });

// aborts the first HTTP request, and cancels the first promise 
// logs `request cancelled 1`
// logs `resolved promise 2`
```
Multiple requests with different `requestId`, cancell `part`
```javascript
const requestId1 = 'requestId1';
const promise1 = axios.get(url, {
  requestId: requestId1
})
  .then(res => {
    console.log('resolved promise 1');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled 1');
    } else {
      console.log('some other reason 1');
    }
  });

const requestId2 = 'requestId2';
const promise2 = axios.get(url, {
  requestId: requestId2
})
  .then(res => {
    console.log('resolved promise 2');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled 2');
    } else {
      console.log('some other reason 2');
    }
  });

const requestId3 = 'requestId3';
const promise3 = axios.get(url, {
  requestId: requestId3
})
  .then(res => {
    console.log('resolved promise 3');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled 3');
    } else {
      console.log('some other reason 3');
    }
  });

axios.cancel([requestId1, requestId2]);

// aborts part HTTP request, and cancels part promises
// logs `request cancelled 1`
// logs `request cancelled 2`
// logs `resolved promise 3`
```
Multiple requests with different `requestId`, cancell `all`
```javascript
const requestId1 = 'requestId1';
const promise1 = axios.get(url, {
  requestId: requestId1
})
  .then(res => {
    console.log('resolved promise 1');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled 1');
    } else {
      console.log('some other reason 1');
    }
  });

const requestId2 = 'requestId2';
const promise2 = axios.get(url, {
  requestId: requestId2
})
  .then(res => {
    console.log('resolved promise 2');
  }).catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('request cancelled 2');
    } else {
      console.log('some other reason 2');
    }
  });

axios.cancelAll();

// aborts all HTTP request, and cancels all promises
// logs `request cancelled 1`
// logs `request cancelled 2`
```

## Methods

*axiosCancel(instance: axios[, options])*

*options*
- debug _(enables logging)_

*axios.cancel(requestId: string | Array[, reason: string])*

*axios.cancelAll([reason: string])*

## License

MIT
