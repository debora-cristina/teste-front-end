<template>
    <div class = "menu-list-products">
     <b-container fluid class="bv-example-row">
       <b-row>
         <b-col>
            <label for="games">Select Category</label>
                        <b-form-select id="games" v-model="categorySelected" 
                            :options="categories"
                        >
                        <span>{{categorySelected}}</span>
            </b-form-select>
         </b-col>
       </b-row>

        <b-row :cols="cols[0]" :cols-sm="cols[1]" :cols-md="cols[2]" 
               :cols-lg="cols[3]" :cols-xl="cols[4]" >
              <b-col  	 
                v-for="product in products" :key="product.id"	           
                col	           
                no-gutters	           
                class="mb-2 mt-4"
               >
                <Product :product="product"/>  
                      
        </b-col>               
          
        </b-row>
     </b-container>
    </div>
</template>

<script>
import axios from 'axios'
import Product from './Product'
export default {
    name:'menu',
    components:{Product},
    data(){
        return{
            listProducts:[],
            products:[],
            categories:[],
            categorySelected: null,
            cols: []
        }
    },
    methods:{
        getListProducts(){

            axios.get('https://front-end-test-app.s3.amazonaws.com/menu.json')
            .then(res =>{
                this.categories = res.data.map(c =>{
                    return {value:c.category_title, text:c.category_title }
                })

                res.data.map(item=>{
                    this.products.push(...item.products)
                })

            })
            .catch(err => {
                return err
            })
        },
        setSize(){
            if(this.products.length == 1 || undefined){
                this.cols = [1,1,1,1,1]
            }else{
                if(this.$mq === 'xs'){
                    this.cols = [1,1,2,3,3]
                }
                else if(this.$mq === 'Z0'){
                    this.cols = [1,1,2,3,3]
                }
                else if(this.$mq === 's'){
                    this.cols = [1,2,2,3,3]
                }
                else if(this.$mq === 'Z2'){
                    this.cols = [1,2,2,2,3]
                }  
                else if(this.$mq === 'md'){
                    this.cols = [1,2,3,3,3]
                } 
                else if(this.$mq === 'lg'){
                    this.cols = [1,2,3,3,3]
                }
                else if(this.$mq === 'Z3'){
                    this.cols = [1,2,3,3,3]
                } 
                else if(this.$mq === 'xl'){
                    this.cols = [1,2,2,3,4]
                }
            }
        }
    },
    mounted(){
        this.getListProducts()
        this.setSize()
    }
}
</script>

<style>
.menu-list-products{
     margin-top: 2%;
}
</style>