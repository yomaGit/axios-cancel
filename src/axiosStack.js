import { getGuid } from '../utils/assist';

export default {
  data() {
    return {
      axiosCancelText: "axios cancel",// cancel的提示文字
      axiosOrigin: null,// axios对象
      axiosStacks: {},// 记录栈
    }
  },
  methods: {
    // 初始化axios请求配置
    initAxiosStacks({ cancelText, axios }) {
      cancelText && (this.axiosCancelText = cancelText);
      axios && (this.axiosOrigin = axios);
    },
    // 获取栈内容信息
    getAxiosStackMsg(key) {
      return this.axiosStacks[key]
    },
    // 添加axios的请求栈
    createAxiosStack() {
      let axiosSource = {};
      let key = null;
      if (this.axiosOrigin) {
        key = getGuid();
        // 获取axios的请求token
        axiosSource = this.axiosOrigin.CancelToken.source();
        this.axiosStacks[key] = {
          cancelState: false,
          source: axiosSource
        };
      }

      return {
        source: axiosSource,
        key
      };
    },
    // 删除axios栈内的值
    deleteAxiosStack(key) {
      delete this.axiosStacks[key];
    },
    // 销毁axios栈内的所有请求
    destroyAxiosStackAll() {
      Object.values(this.axiosStacks).forEach(a => {
        a.source.cancel(this.axiosCancelText);
        a.cancelState = true;
      });
    }
  }
}