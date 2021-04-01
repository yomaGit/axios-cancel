import RequestManager from './request-manager';
export default function axiosCancel(axios, options) {
  const defaultOptions = {
    debug: false
  }
  options && Object.assign(defaultOptions, options);
  
  const requestManager = new RequestManager(defaultOptions);

  if(!axios) {
    requestManager.log('arguments axios error');
    return;
  }
  
  const {CancelToken} = axios;
  
  axios.interceptors.request.use(config => {
    const { requestId } = config || {};
    if (requestId) {
      const source = CancelToken.source();
      config.cancelToken = source.token;
      requestManager.addRequest(requestId, source.cancel);
    }

    return config;
  })

  axios.interceptors.response.use(response => {
    const { requestId } = response && response.config || {};
    requestId && requestManager.removeRequest(requestId);

    return response;
  })

  axios.cancel = (requestId, reason) => {
    requestId && requestManager.cancelRequest(requestId, reason);
  }

  axios.cancelAll = (reason) => {
    requestManager.cancelAllRequests(reason);
  }
}