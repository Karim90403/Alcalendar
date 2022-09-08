<template>
<div v-if="!verify">
  <div class="flex justify-center mt-52">
    <h1 class="cursor-pointer text-3xl text-center text-black my-4 dark:text-white" :class="isNeedRegistration ? 'underline' : 0" @click="showReg()">Регистрация</h1>
    <div class="text-3xl text-center text-black my-4 dark:text-white">/</div>
    <h1 class="cursor-pointer text-3xl text-center text-black my-4 dark:text-white" :class="!isNeedRegistration ? 'underline' : 0" @click="showAuth()">Авторизация</h1>
  </div>
  <div v-if="isNeedRegistration">
    <div v-if="isUserRegistred" class="text-xl text-center text-red-400 my-2">Пользователь с данным именем уже зарегестрирован</div>
    <form @submit.prevent="Verify()" class="w-full h-full mt-8 space-y-6 flex flex-col justify-center items-center" action="#" method="POST">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
            <div>
                <label for="Login" class="sr-only">Login</label>
                <input id="Login" v-model="userLogin" name="Login" type="text" autocomplete="Login"
                    required
                    class="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-2xl lg:text-sm"
                    placeholder="Логин">
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" v-model="userPassword" name="password" type="password"
                    autocomplete="current-password" required
                    class="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-2xl lg:text-sm"
                    placeholder="Пароль">
            </div>
        </div>
        <div>
            <button type="submit"
                class="group relative text-center py-2 px-7 border border-transparent font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-2xl lg:text-sm">
                Зарегестрироваться
            </button>
        </div>
    </form>
  </div>
  <div v-else>
    <div v-if="showMessage" class="text-xl text-center text-red-400 my-2">Данный пользователь не зарегестрирован</div>
    <form @submit.prevent="Login()" class="w-full h-full mt-8 space-y-6 flex flex-col justify-center items-center" action="#" method="POST">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
            <div>
                <label for="Login" class="sr-only">Login</label>
                <input id="Login" v-model="userLogin" name="Login" type="text" autocomplete="Login"
                    required
                    class="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-2xl lg:text-sm"
                    placeholder="Логин">
            </div>
            <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" v-model="userPassword" name="password" type="password"
                    autocomplete="current-password" required
                    class="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-2xl lg:text-sm"
                    placeholder="Пароль">
            </div>
        </div>
        <div>
            <button type="submit"
                class="group relative text-center py-2 px-20 border border-transparent font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-2xl lg:text-sm">
                Войти
            </button>
        </div>
    </form>
  </div>
</div>
<div v-else>
  <h1 class="text-3xl text-center text-black my-4 dark:text-white">Алкалендарь</h1>
  <div class="cursor-pointer absolute top-4 right-10 text-black dark:text-white text-xl" @click="signOut()">Выйти</div>
  <div class="flex justify-between p-4">
    <div class="flex flex-col">
      <v-date-picker class="inline-block" v-model="date" :max-date="new Date()" :is-dark=isSearchActive>
      <template v-slot="{ inputValue, togglePopover }">
        <div class="flex items-center">
          <button
            class="p-2 bg-blue-100 border border-gray-300 hover:bg-gray-300 text-gray-600 rounded-l focus:bg-gray-500 focus:text-white focus:border-garay-500 focus:outline-none dark:bg-gray-900 dark:border-gray-600"
            @click="togglePopover()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="w-4 h-4 fill-current"
            >
              <path
                d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
              ></path>                  
            </svg>
          </button>
          <input
            :value="inputValue"
            class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            readonly
          />
        </div>
      </template>
      </v-date-picker>

      <ul class="items-center w-full my-2 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 sm:flex dark:bg-gray-900 dark:border-gray-800 dark:text-white">
          <li class="w-full border-b border-gray-300 sm:border-b-0 sm:border-r dark:border-gray-800">
              <div class="flex items-center pl-3">
                  <input id="heavily" v-model="how" type="radio" value="heavily" name="list-radio" class="cursor-pointer w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-900 dark:border-gray-500">
                  <label for="heavily" class="cursor-pointer py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Сильно </label>
              </div>
          </li>
          <li class="w-full border-b border-gray-300 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                  <input id="not-heavily" v-model="how" type="radio" value="not-heavily" name="list-radio" class="cursor-pointer w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-900 dark:border-gray-500">
                  <label for="not-heavily" class="cursor-pointer w-py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Чисто по пивку</label>
              </div>
          </li>
      </ul>

      <div class="bg-white text-gray-700 cursor-pointer py-2 px-2 text-center appearance-none border rounded-r focus:outline-none focus:border-garay-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white" @click="append()">Добавить</div>
      <div class="text-xl text-center text-blacf mt-2 dark:text-white">Удалить</div>
      <div class="flex justify-between">
        <div class="text-black text-ld mt-2 py-1 px-3 rounded cursor-pointer dark:text-white" :class="isHard ? 'bg-gray-300 dark:bg-gray-500' : 0" @click="showHard()">Сильно</div>
        <div class="text-black text-ld mt-2 py-1 px-3 rounded cursor-pointer dark:text-white" :class="!isHard ? 'bg-gray-300 dark:bg-gray-500' : 0" @click="showNotHard()">Не сильно</div>
      </div>
      <div class="border-gray-300 border h-full p-3 rounded my-2 flex flex-col overflow-y-scroll dark:bg-gray-900 dark:border-gray-700">
        <div v-if="isHard">
          <div v-for="item in this.attrs[0].dates" class="text-black flex justify-between border-b-2 py-2 border-black dark:text-white dark:border-white">
            {{item.toLocaleDateString()}}
            <button @click="removeFromHard(item)">X</button>
          </div>
        </div>
        <div v-if="!isHard">
          <div v-for="item in this.attrs[1].dates" class="text-black flex justify-between border-b-2 py-2 border-black dark:text-white dark:border-white">
            {{item.toLocaleDateString()}}
            <button @click="removeFromNotHard(item)">X</button>
          </div>
        </div>
      </div>
    </div>
    <v-calendar
      :columns="layout.columns"
      :rows="layout.rows"
      :max-date="new Date()"
      :attributes="attrs"
      :is-dark=isSearchActive
    />
  </div>
</div>
</template>

<script>
import axios from 'axios';
import { get } from 'lodash';

export default{
  data() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
    return {
      userLogin: "",
      userPassword: "",
      verify: false,
      isHard: true,
      showMessage: false,
      isUserRegistred: false,
      isNeedRegistration: true,
      date: new Date(),
      how: "heavily",
      attrs: [
        {
          highlight: {
            color: 'purple',
            fillMode: 'solid'
          },
          dates: []
        },
        {
          highlight: {
            color: 'purple',
            fillMode: 'light',
          },
          dates: []
        },
      ],
    };
  },
  methods:{
    append(){
      this.attrs[0].dates = this.attrs[0].dates.filter((t) => t !== this.date)
      this.attrs[1].dates = this.attrs[1].dates.filter((t) => t !== this.date)
      if(this.how == "heavily"){
        this.attrs[0].dates.push(this.date)
        this.submit()
      }
      else{
        this.attrs[1].dates.push(this.date)
        this.submit()
      }
    },
    removeFromHard(item){
      this.attrs[0].dates = this.attrs[0].dates.filter((t) => t !== item)
      this.submit()
    },
    removeFromNotHard(item){
      this.attrs[1].dates = this.attrs[1].dates.filter((t) => t !== item)
      this.submit()
    },
    showAuth(){
      this.isNeedRegistration = false
    },
    showReg(){
      this.isNeedRegistration = true
    },
    showNotHard(){
      this.isHard = false
    },
    showHard(){
      this.isHard = true
    },
    signOut(){
      this.verify = false
      this.attrs[0].dates = []
      this.attrs[1].dates = []
    },
    async Verify(){
      try {
        let res = await axios.post("http://localhost:8023/api/registration", { login: this.userLogin, password: this.userPassword })
        this.verify = true
        localStorage.setItem("token", res.data.token)
        this.getData()
      }catch (error) {
        console.log(error);
        this.isUserRegistred = true
      }
    },
    async Login(){
      try {
        let res = await axios.post("http://localhost:8023/api/login", { login: this.userLogin, password: this.userPassword })
        this.verify = true
        localStorage.setItem("token", res.data.token)
        this.getData()
      }catch (error) {
        console.log(error);
        this.showMessage = true
      }
    },
    async submit() {
    try{
      let res = await axios.post("http://localhost:8023/api/submitData", { token: localStorage.getItem("token"), hardDays: this.attrs[0].dates, notHardDays: this.attrs[1].dates })
    } catch(error){
      console.log(error)
    }
  },
  async getData() {
    if(localStorage.getItem("token") === null){
      this.verify = false
    } else {
      this.verify = true
      try{
        let res = await axios.post("http://localhost:8023/api/getData", { token: localStorage.getItem("token") })
        res.data.hardDays.forEach(date => this.attrs[0].dates.push(new Date(date)))
        res.data.notHardDays.forEach(date => this.attrs[1].dates.push(new Date(date)))
      } catch(error){
        console.log(error)
    }
    }
  }
  },
  async mounted() {
    this.getData()
  },
  async unmounted() {
    this.submit()
  },
  computed: {
    isSearchActive(){
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    layout() {
      return this.$screens(
        {
          // Default layout for mobile
          default: {
            columns: 1,
            rows: 2,
            isExpanded: true,
          },
          // Override for large screens
          lg: {
            columns: 4,
            rows: 3,
            isExpanded: false,
          },
        },
      );
    }
  }
}
</script>

<style>
@media (prefers-color-scheme: dark) {
  body{
    background-color: #374151;
  }
}
</style>