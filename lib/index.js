import AxiosCancelManager from './axios-cancel';
export default function axiosCancel(axios, options) {
  const defaultOptions = {
    debug: false
  };
  options && Object.assign(defaultOptions, options);
  
  const axiosCancelManager = new AxiosCancelManager(defaultOptions);

  if(!axios) {
    axiosCancelManager.log('arguments axios error');
    return;
  }
  
  const {CancelToken} = axios;
  
  axios.interceptors.request.use(config => {
    const { requestId } = config;
    if (requestId) {
      const source = CancelToken.source();
      config.cancelToken = source.token;
      axiosCancelManager.addRequest(requestId, source.cancel);
    }

    return config;
  });

  axios.interceptors.response.use(response => {
    const { requestId } = response.config;
    requestId && axiosCancelManager.removeRequest(requestId);

    return response;
  });

  axios.cancel = (requestId, reason) => {
    requestId && axiosCancelManager.cancelRequest(requestId, reason);
  };

  axios.cancelAll = (reason) => {
    axiosCancelManager.cancelAllRequests(reason)
  };
}