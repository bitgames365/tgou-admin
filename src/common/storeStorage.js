/**
 * npm install --save store
 * localstore用于存放一些数据
 * localStorage - 没有时间限制的数据存储
 * sessionStorage - 针对一个 session 的数据存储,当用户关闭浏览器窗口后，数据会被删除。
 * Key当前会话关闭就没了，不保存
 * 
 * 测试：
    mounted: function(){
      var value = '1111';
      this.$session.set('value1', value);
      console.log(this.$session.get('value1'));
      var value2 = 222;
      this.$local.set('value2', value2);
      console.log(this.$local.get('value2'));
      this.$ACCESS_TOKEN = "hello";
      console.log(this.$ACCESS_TOKEN)
    }
 * 
 */

import 'vue';
import store from 'store';
import sessionStorage from 'store/storages/sessionStorage';
import localStorage from 'store/storages/localStorage';

export const sessionStor = store.createStore(sessionStorage);
export const localStor = store.createStore(localStorage);

export const STORAGE_KEYS = {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    LOGIN_NAME: 'LOGIN_NAME',
};

export const storePlugin = (V) => {
    Object.defineProperty(V.prototype, '$session', {value: sessionStor, writable: true});
    Object.defineProperty(V.prototype, '$local', {value: localStor, writable: true});
    Object.defineProperty(V.prototype, '$STORAGE_KEYS', {value: STORAGE_KEYS, writable: true});
};

export default sessionStor;
