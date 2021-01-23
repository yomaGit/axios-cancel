<template>
  <div id="app">
    <input type="text" @input="handleInputChange">
  </div>
</template>

<script>
import axios from 'axios';
// import axiosStack from 'axios-cancel-mixin';
import axiosStack from './axiosCancel/index';
// import axiosStack from '../dist/index';
axiosStack(axios, {
  debug: true
})

export default {
  name: 'App',
  methods: {
    // 处理input的change
    handleInputChange() {
      // 取消全部
      axios.cancelAll("input cancel");
      // 创建axios标识，获取key
      axios.get('//localhost:3003/test/get-data-get', {
        requestId: `id_${new Date().getTime()}`
      }).then(() => {
      }).catch(msg => {
        if(!axios.isCancel(msg)) {
          console.log("catch error in:", msg);
        } else {
          console.log("catch cancel in:", msg);
        }
      });

      axios.post('//localhost:3003/test/get-data-post', {}, {
        requestId: `id_${new Date().getTime()}`
      }).then(() => {
      }).catch(msg => {
        if(!axios.isCancel(msg)) {
          console.log("catch error in:", msg);
        } else {
          console.log("catch cancel in:", msg);
        }
      });
    }
  }
}
</script>