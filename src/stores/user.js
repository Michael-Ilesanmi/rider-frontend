import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import router from "@/router";
import { app } from "@/main.js"

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const token = ref(null);
  const setToken = (payload) => {
    if (!payload) {
      axios.defaults.headers["Authorization"] = null;
      return localStorage.removeItem('_token');
    }
    token.value = payload
    axios.defaults.headers["Authorization"] = `Bearer ${token.value}`;
    return localStorage.setItem('_token', token.value)
  }
  const setUser = (payload) => {
    return user.value = payload
  }
  const logout = () => {
    setToken();
    user.value = null;
    return router.push({ name: "LoginPage" });
  }
  const auth = async () => {
    if (! localStorage._token) {
      token.value = null;
      user.value = null;
      return;
    }
    setToken(localStorage._token)
    try {
      const { data } = await axios.get('/auth')
      user.value = data.payload
    } catch (error) {
      console.log(error);
    }
  } 

  return { user, token, setToken, setUser, auth, logout }
})
