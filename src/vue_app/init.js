/*import { createApp } from 'petite-vue';


const vueApp = createApp({
    // exposed to all expressions
    count: 0,
    showFlag: false,
    // methods
    increment() {
        this.count++
    },
    toggleShowFlag() {
        this.showFlag = !this.showFlag;
    }
}).mount();*/

import {createApp} from 'vue';

const app = createApp({
    data() {
        return {
            showFlag:false, 
            count: 0
        }
    }
})

app.mount('#app');