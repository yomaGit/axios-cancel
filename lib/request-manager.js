export default class requestManager {
  constructor(options) {
    this.options = options || {};
    this.pendingRequests = {};
  }
  // Add request
  addRequest(requestId, cancelFn, reason = `cancelRequest request from addRequest`) {
    this.log(`addRequest: ${requestId}`);

    if(requestId === undefined) return;

    // The same request exists - cancel request first
    this.has(requestId) && this.cancelRequest(requestId, reason);

    this.pendingRequests[requestId] = cancelFn;
  }
  // Delete request
  removeRequest(requestId) {
    this.log(`removeRequest: ${requestId}`);

    if(requestId === undefined) return;

    delete this.pendingRequests[requestId];
  }
  // Cancel request
  cancelRequest(requestId, reason) {
    if(requestId === undefined) return;

    if(Array.isArray(requestId)) {
      requestId.forEach(id => {
        this.cancelRequestSingle(id, reason);
      })
    } else {
      this.cancelRequestSingle(requestId, reason);
    }
  }
  // Cancel request single
  cancelRequestSingle(requestId, reason) {
    if(requestId === undefined) return;

    if (this.has(requestId)) {
      this.log(`cancelRequest: ${requestId}`);

      if(typeof this.pendingRequests[requestId] !== 'function') return;

      this.pendingRequests[requestId](`${reason} \`requestId: ${requestId}\``);
      this.removeRequest(requestId);
    }
  }
  // Cancel all requests
  cancelAllRequests(reason) {
    for (let requestId in this.pendingRequests) {
      this.cancelRequest(requestId, reason);
    }
  }
  // Judge requestId exists or not
  has(requestId) {
    return this.pendingRequests[requestId];
  }
  // Console log
  log(message) {
    this.options.debug && (console.log(message));
  }
}