# axios-cancel

### using npm
```
npm i axios-cancel-mixin
```
### methods
```
initAxiosStacks
初始化，传入axios和cancelText（取消时的错误文字）

createAxiosStack
创建axios请求，返回 key（请求标识key）、source（请求操作对象）

getAxiosStackMsg
获取某个请求的记录信息，传入 请求标识key

deleteAxiosStack
删除某个请求key，传入 请求标识key

cancelAxiosItem
取消某个请求，传入 请求标识key

destroyAxiosStackAll
取消所有请求
```
### example
```
<template>
  <div id="app">
    <input type="text" @input="handleInputChange">
  </div>
</template>

<script>
import axios from 'axios';
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
      cancelText: "i am cancel string", 
      axios: axios
    })
  }
}
</script>
```