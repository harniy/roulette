import { createRouter, createWebHashHistory} from 'vue-router'
import home from '../pages/home.vue';
import error from '../pages/404.vue';


const routes = [
    { path: '/', component: home },
    { path: '/:pathMatch(.*)*', component: error },
  ]



export const router = createRouter({
    history: createWebHashHistory(),
    routes, 
  })
  