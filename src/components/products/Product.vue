<template>
  <div class="product">
    <b-card
        :title="product.title"
        :img-src="product.picture"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 18rem; margin-top: 10px;"
        class="mb-2"
    >
        <b-card-text style="overflow-y: auto; height:100px" >
            {{product.description}}            
        </b-card-text>

         <b-card-text>
             ${{product.price}}
         </b-card-text>

         <b-form-rating v-model="product.rate" class="mb-3" readOnly></b-form-rating>

        <b-button href="#" variant="primary">Add to card</b-button>
        <b-button @click="onDelete" class="ml-2" variant="danger">Delete</b-button>
        
    </b-card>
  </div>
</template>

<script>
export default {
    name:"products",
    props: ['product','edit'],
    methods:{
        onDelete(){
            this.$emit('update', this.product)   
        }
    },    
    watch:{
         'product': function(){
            this.$emit('update:product', this.product)
        }
     }
}
</script>

<style>
.product{
    margin-top: 2%;
}
</style>