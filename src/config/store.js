import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
       dataProducts: []
    },  
    mutations:{
        setdataProducts(state, products){
            state.dataProducts = products
            
        }
    },
    getters:{
        getDataProducts(state) {
            return state.dataProducts;
        }
    }
})