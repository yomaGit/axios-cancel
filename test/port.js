import expect from 'expect.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import axiosCancel from '../lib/index.js';

const url = 'http://test/examples';

const mock = new MockAdapter(axios, {delayResponse: 300});

mock.onGet(url).reply(200, {
  success: true
});

describe('axios cancel', () => {
  before(function () {
    axiosCancel(axios, {
      debug: false
    });
  })

  it('normal request', () => {
    return axios.get(url)
      .then(res => {
        expect(res.data.success).to.be(true);
      })
      .catch(error => {
        expect(error).to.be(null);
      });
  })

  it('request with requestId', () => {
    const requestId = 'request_id';
    return axios.get(url, {
      requestId
    })
      .then(res => {
        expect(res.data.success).to.be(true);
      })
      .catch(error => {
        expect(error).to.be(null);
      });
  })
  
  it('cancel a single request with requestId', () => {
    const requestId = 'request_id_single';
    const promise = axios.get(url, {
      requestId: requestId
    })
      .then(res => {
        expect(res).to.be(null);
      })
      .catch(res => {
        expect(axios.isCancel(res)).to.be(true);
      });

    setTimeout(() => {
      axios.cancel(requestId);
    }, 100)

    return promise;
  })

  it('cancel a request with subsequent requests with same `requestId`', () => {
    const requestId = 'request_id_same';
    let arrRes = [];
    axios.get(url, {
      requestId: requestId
    })
      .then(() => {
        arrRes.push('first then');
      })
      .catch(() => {
        arrRes.push('first cache');
      });

    axios.get(url, {
      requestId: requestId
    })
      .then(() => {
        arrRes.push('second then');
      })
      .catch(() => {
        arrRes.push('second cache');
      });

    setTimeout(() => {
      expect(JSON.stringify(arrRes)).to.be("[\"first cache\"]");
    }, 100);
  })

  it('cancel all requests', () => {
    const requestId1 = 'request_id_cancel_1';
    const requestId2 = 'request_id_cancel_2';
    const requestId3 = 'request_id_cancel_3';
    
    axios.get(url, {
      requestId: requestId1
    })
      .then(res => {
        expect(res).to.be(null);
      })
      .catch(res => {
        expect(axios.isCancel(res)).to.be(true);
      });

    axios.get(url, {
      requestId: requestId2
    })
      .then(res => {
        expect(res).to.be(null);
      })
      .catch(res => {
        expect(axios.isCancel(res)).to.be(true);
      });

    axios.get(url, {
      requestId: requestId3
    })
      .then(res => {
        expect(res).to.be(null);
      })
      .catch(res => {
        expect(axios.isCancel(res)).to.be(true);
      });

    axios.cancelAll();
  })
})