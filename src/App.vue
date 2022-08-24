<template>
<h1 class="text-3xl text-center text-black my-4 dark:text-white">Календарь алкоголизма</h1>
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
                <input id="heavily" v-model="how" type="radio" value="heavily" name="list-radio" class="cursor-pointer w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-900 dark:border-gray-500">
                <label for="heavily" class="cursor-pointer py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Сильно </label>
            </div>
        </li>
        <li class="w-full border-b border-gray-300 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div class="flex items-center pl-3">
                <input id="not-heavily" v-model="how" type="radio" value="not-heavily" name="list-radio" class="cursor-pointer w-5 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-900 dark:border-gray-500">
                <label for="not-heavily" class="cursor-pointer w-py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Чисто по пивку</label>
            </div>
        </li>
    </ul>

    <div class="bg-white text-gray-700 cursor-pointer py-2 px-2 text-center appearance-none border rounded-r focus:outline-none focus:border-garay-500 dark:bg-gray-900 dark:border-gray-600 dark:text-white" @click="append()">Добавить</div>
    <div class="text-xl text-center text-blacf mt-2 dark:text-white">Удалить</div>
    <div class="flex justify-between">
      <div class="text-black text-ld mt-2 py-1 px-3 rounded cursor-pointer dark:text-white" :class="isHard ? 'bg-gray-300 dark:bg-gray-500' : 0" @click="toggle()">Сильно</div>
      <div class="text-black text-ld mt-2 py-1 px-3 rounded cursor-pointer dark:text-white" :class="!isHard ? 'bg-gray-300 dark:bg-gray-500' : 0" @click="toggle()">Не сильно</div>
    </div>
    <div class="border-gray-300 border h-full p-3 rounded my-2 flex flex-col overflow-y-scroll dark:bg-gray-900 dark:border-gray-700">
      <div v-for="item in this.attrs[0].dates" class="text-black flex justify-between border-b-2 py-2 border-black dark:text-white dark:border-white">
        {{item.toLocaleDateString()}}
        <button @click="removeFromHard(item)">X</button>
      </div>
    </div>
  </div>
  <v-calendar
    :columns="4"
    :rows="3"
    :max-date="new Date()"
    :attributes="attrs"
    :is-dark=isSearchActive
  />
</div>
</template>

<script>
export default{
  data() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
    return {
      isHard: true,
      date: new Date(),
      how: "heavily",
      attrs: [
        {
          highlight: {
            color: 'purple',
            fillMode: 'solid'
          },
          dates: [
            new Date(year, month, 12),
            new Date(year, month, 10)
          ]
        },
        {
          highlight: {
            color: 'purple',
            fillMode: 'light',
          },
          dates: [
            new Date(year, month, 15),
            new Date(year, month, 16)
          ]
        },
      ],
    };
  },
  methods:{
    append(){
      if(this.how == "heavily"){
        this.attrs[0].dates.push(this.date)
      }
      else{
        this.attrs[1].dates.push(this.date)
      }
    },
    removeFromHard(item){
      this.attrs[0].dates = this.attrs[0].dates.filter((t) => t !== item)
    },
    removeFromNotHard(item){
      this.attrs[1].dates = this.attrs[1].dates.filter((t) => t !== item)
    },
    toggle(){
      this.isHard = !this.isHard
    }
  },
  computed: {
    isSearchActive(){
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
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