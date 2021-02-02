<template>
    <div class = "menu-list-products">
     <b-container fluid class="bv-example-row">
       <b-row>
         <b-col>
            <label for="products">Select Category</label>
                        <b-form-select id="products" v-model="categorySelected" 
                            :options="categories"
                        >
            </b-form-select>
         </b-col>
       </b-row>

       <b-row>
         <b-col>
            <label for="titleFilter">Filter By Title: </label>
                <b-input id="titleFilter" type="text" v-model="titleFilter" />
         </b-col>
       </b-row>

       <b-row>
         <b-col>
            <label for="descriptionFilter">Filter By Description: </label>
                <b-input id="descriptionFilter" type="text" v-model="descriptionFilter" />
         </b-col>
       </b-row>



        <b-row :cols="cols[0]" :cols-sm="cols[1]" :cols-md="cols[2]" 
               :cols-lg="cols[3]" :cols-xl="cols[4]" >
              <b-col  	 
                v-for="product in filterListProducts" :key="product.id"	           
                col	           
                no-gutters	           
                class="mb-2 mt-4"
               >
                <Product :product="product" @update="onDelete"/>  
                      
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
            cols: [],
            descriptionFilter: '',
            titleFilter:'',
            productsFilter: []
        }
    },
    methods:{
        onDelete(item){
            
            let position = this.products.findIndex(product => product.id === item.id)

            this.products.splice(position, 1)
           
        },
        getListProducts(){

            axios.get('https://front-end-test-app.s3.amazonaws.com/menu.json')
            .then(res =>{
                this.categories = res.data.map(c =>{
                    return {value:c.category_title, text:c.category_title }
                })
                
                res.data.map(item=>{
                    item.products.forEach( product => {
                        product.rate = Math.floor(Math.random() * 5) + 1
                        this.products.push(product)
                    })
                })

                this.listProducts = res.data
                        
                this.listProducts.map(item=>{
                    this.products.push(...item.products)
                })

                this.productsFilter = this.products

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
    computed:{
        filterListProducts(){
            if(this.categorySelected != null ){

                let products = []

                let categoryProducts = this.listProducts.filter((item) => {
                    return item.category_title === this.categorySelected;
                });

                console.log(categoryProducts)

                categoryProducts.map(item=>{
                    products.push(...item.products)
                })
                
                return products
            
            } 
            else{       

                return this.products
            }
        }
    },
    mounted(){
        this.getListProducts()
        this.setSize()
    },
    watch:{
        'descriptionFilter':function(){

            this.products = this.productsFilter

           if(this.descriptionFilter !== ''){
               let products = []
               products = this.products.filter((item) => {
                    return item.description.includes(this.descriptionFilter);
               });
    
              this.products = products

            }
        },
        'titleFilter':function(){
            this.products = this.productsFilter

            if(this.titleFilter !== ''){

            let products = []
               products = this.products.filter((item) => {
                    return item.title.includes(this.titleFilter);
               });
    
              this.products = products

            }
        }
    }

    
}
</script>

<style>
.menu-list-products{
     margin-top: 2%;
}
</style>