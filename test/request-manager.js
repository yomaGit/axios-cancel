import expect from 'expect.js';
import RequestManager from '../lib/request-manager.js';

describe('requestManager', () => {
  let requestManager = null;

  before(() => {
    requestManager = new RequestManager();
  })

  it('adds a request', () => {
    const reqId = 'requestId';
    
    requestManager.addRequest(reqId, () => {});
    expect(requestManager.has(reqId)).to.be.a(Function);
  })

  it('removes a request', () => {
    const reqId = 'requestId_remove';

    requestManager.addRequest(reqId, () => {});
    expect(requestManager.has(reqId)).to.be.a(Function);

    requestManager.removeRequest(reqId);
    expect(requestManager.has(reqId)).to.be(undefined);
  })

  it('cancels a request', () => {
    const reqId = 'requestId_cancel';
    let cancelStr = 'pending'

    requestManager.addRequest(reqId, () => {
      cancelStr = 'resolve';
    });

    requestManager.cancelRequest(reqId);
    expect(requestManager.has(reqId)).to.be(undefined);
    expect(cancelStr).to.be('resolve');
  })

  it('cancels a request with default `reason` message', () => {
    const reqId = 'requestId_cancel_reason';
    const reason = `cancelRequest(${reqId}) from mocha test`;
    let cancelStr = '';

    requestManager.addRequest(reqId, res => {
      cancelStr = res;
    });
    requestManager.cancelRequest(reqId, reason);
    expect(cancelStr).to.contain(reason);
  })

  it('cancels the precedent request if same `requestId` is sent before removal', () => {
    const reqId = 'requestId_same';
    const arrCancel = [];

    requestManager.addRequest(reqId, res => {
      arrCancel.push(res);
    })
    requestManager.addRequest(reqId, res => {
      arrCancel.push(res);
    })

    expect(arrCancel).to.length(1);
    requestManager.cancelRequest(reqId);
    expect(arrCancel).to.length(2);
  })

  it('cancels all requests', () => {
    const reqId1 = 'requestId_all1';
    const reqId2 = 'requestId_all2';
    const reqId3 = 'requestId_all3';
    const arrCancel = [];

    requestManager.addRequest(reqId1, res => {
      arrCancel.push(res);
    });
    requestManager.addRequest(reqId2, res => {
      arrCancel.push(res);
    });
    requestManager.addRequest(reqId3, res => {
      arrCancel.push(res);
    });

    requestManager.cancelAllRequests();
    expect(arrCancel).to.length(3);
  })
})