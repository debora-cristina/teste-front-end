import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../components/products/Menu.vue'

Vue.use(VueRouter)

const routes = [
    {
        name:'menu',
        path: '/menu',
        component: Menu
    },
    {
        name:'home',
        path: '/home',
        component: Menu
    }
  
]
 
const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router;