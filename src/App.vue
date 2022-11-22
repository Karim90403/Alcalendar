<template>
<div v-if="!verify">
  <div class="flex justify-center mt-52">
    <h1 class="cursor-pointer text-3xl text-center text-black my-4 dark:text-white" :class="isNeedRegistration ? 'underline' : 0" @click="this.isNeedRegistration = true">Регистрация</h1>
    <span class="text-3xl text-center text-black my-4 dark:text-white">/</span>
    <h1 class="cursor-pointer text-3xl text-center text-black my-4 dark:text-white" :class="!isNeedRegistration ? 'underline' : 0" @click="this.isNeedRegistration = false">Авторизация</h1>
  </div>
  <div v-if="isNeedRegistration">
    <div v-if="isUserRegistred" class="text-xl mx-auto text-center text-red-400 my-2">Пользователь с данным именем уже зарегестрирован</div>
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
    <div v-if="showMessage" class="text-xl text-center mx-auto text-red-400 my-2">Данный пользователь не зарегестрирован</div>
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
  <h1 class="text-3xl text-left text-black my-4 mx-4 sm:mx-10 dark:text-white ">Алкалендарь</h1>
  <span class="cursor-pointer absolute top-5 right-5 text-black dark:text-white text-xl sm:top-4 sm:right-10" @click="signOut()">Выйти</span>
  <div class="flex  py-4 pr-4 overflow-x-hidden sm:py-40" :class="!showMenu ? 'justify-center' : 'justify-between'"  >
    <div class="flex flex-col px-4 pt-5 w-1/2 rounded bg-gray-100 ease-in-out duration-500 dark:bg-gray-800 sm:w-auto" :style="!showMenu ? 'transform: translateX(-300px)' : 0" :class="!showMenu ? 'w-0 overflow-x-hidden' : 0">
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
            class="bg-white h text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white"
            readonly
          />
        </div>
      </template>
      </v-date-picker>

      <ul class="items-center w-full my-2 py-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 sm:flex dark:bg-gray-900 dark:border-gray-800 dark:text-white">
          <li class="w-full border-gray-300 sm:border-b-0 sm:border-r dark:border-gray-800">
              <div class="flex items-center pl-3">
                  <input id="heavily" v-model="how" type="radio" value="heavily" name="list-radio" class="cursor-pointer w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-900 dark:border-gray-500">
                  <label for="heavily" class="cursor-pointer py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Сильно </label>
              </div>
          </li>
          <li class="w-full border-gray-300 sm:border-b-0 sm:border-r dark:border-gray-600">
              <div class="flex items-center pl-3">
                  <input id="not-heavily" v-model="how" type="radio" value="not-heavily" name="list-radio" class="cursor-pointer w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:outline-none dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-900 dark:border-gray-500">
                  <label for="not-heavily" class="cursor-pointer w-py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Чисто по пивку</label>
              </div>
          </li>
      </ul>

      <span class="bg-white text-gray-700 cursor-pointer py-2 px-2 text-center appearance-none border rounded-r focus:outline-none focus:border-garay-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white" @click="append()">Добавить</span>
      <span class="text-xl text-center text-blacf mt-2 dark:text-white">Просмотр</span>
      <div class="flex justify-between">
        <span class="text-black text-ld mt-2 py-1 px-3 text-center rounded cursor-pointer duration-500 dark:text-white" :class="isHard ? 'bg-gray-300 dark:bg-gray-500' : 0" @click="this.isHard = true">Сильно пил</span>
        <span class="text-black text-ld mt-2 py-1 px-3 text-center rounded cursor-pointer duration-500 dark:text-white" :class="!isHard ? 'bg-gray-300 dark:bg-gray-500' : 0" @click="this.isHard = false">Мало пил</span>
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
    <span class="ease-in-out duration-700" :style="showMenu ? 'transform: translateX(100px)': 0">
      <v-date-picker
      :columns="layout.columns"
      :rows="layout.rows"
      :max-date="new Date()"
      :attributes="attrs"
      v-model="date" 
      :is-dark=isSearchActive
    />
    </span>
  </div>
  <div class="w-full fixed h-12 bottom-0 z-10 flex overflow-hidden sm:top-20 sm:absolute sm:w-3/4 sm:ml-40 sm:rounded">
    <div @click="this.showMenu = true" class="w-1/2 border-r-2 h-full text-center text-4xl text-white duration-500 border-gray-300 dark:border-white" :class="showMenu ? 'bg-slate-500 dark:bg-slate-800' : 'bg-slate-400 dark:bg-slate-900'">+</div>
    <div @click="this.showMenu = false" class="w-1/2 h-full flex justify-center text-white duration-500" :class="!showMenu ? 'bg-slate-500 dark:bg-slate-800' : 'bg-slate-400 dark:bg-slate-900'">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="610.398px" height="610.398px" viewBox="0 0 610.398 610.398" style="enable-background:new 0 0 610.398 610.398;"
	 xml:space="preserve" class="w-7 h-7 fill-current self-center"><g><g>
		<path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052
			c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553
			V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"/>
		<path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992
			h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"/>
		<path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117
			V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818
			c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764
			V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"/>
		<path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"/>
		<path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017
			c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"/>
		<path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"/>
		<path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017
			c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"/>
		<path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"/>
		<path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032
			c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"/>
		<path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"/>
		<path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032
			c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"/></g></g></svg>
    </div>
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
      showMenu: false,
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
      this.attrs[0].dates = this.attrs[0].dates.filter((t) => t.toLocaleDateString("en-US") !== new Date(this.date).toLocaleDateString("en-US"))
      this.attrs[1].dates = this.attrs[1].dates.filter((t) => t.toLocaleDateString("en-US") !== new Date(this.date).toLocaleDateString("en-US"))
      if(this.how == "heavily"){
        this.attrs[0].dates.push(new Date(this.date))
        this.date = new Date()
        this.submit()
      }
      else{
        this.attrs[1].dates.push(new Date(this.date))
        this.date = new Date()
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
body{
    background-image: url(../public/Fon.png);
    background-size: cover;

  }
@media (prefers-color-scheme: dark) {
  body{
    background-color: #374151; 
  }
}
</style>