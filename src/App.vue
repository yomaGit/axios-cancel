<template>
  <div id="app">
    <input type="text" @input="handleInputChange">
  </div>
</template>

<script>
import axios from 'axios';
// import axiosStack from './axiosStack';
import axiosStack from 'axios-cancel-mixin';

export default {
  name: 'App',
  mixins: [axiosStack],
  methods: {
    // 处理input的change
    handleInputChange() {
      // 取消全部
      this.destroyAxiosStackAll();
      // 创建axios标识，获取key
      let {key, source} = this.createAxiosStack();
      axios.get('//localhost:3003/test/get-data', {
        cancelToken: source.token
      }).then(() => {
        // 清除请求key
        this.deleteAxiosStack(key);
      }).catch(msg => {
        let getAxiosMsg = this.getAxiosStackMsg(key);
        if (getAxiosMsg && getAxiosMsg.cancelState) {
          // 被取消的请求
          console.log(`cancel axios in, msg: ${msg && msg.message}`);
        } else {
          // 正常处理
          console.log("method catch");
        }
        // 清除请求key
        this.deleteAxiosStack(key);
      });
    }
  },
  mounted() {
    // 初始化axios相关记录值
    this.initAxiosStacks({
      cancelText: "i am axios cancel app", 
      axios: axios
    })
  }
}
</script>