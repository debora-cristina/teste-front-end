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
        <b-card-text>
            {{product.description}}            
        </b-card-text>

         <b-card-text>
             ${{product.price}}
         </b-card-text>

        <b-button href="#" variant="primary">Add to card</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
    name:"products",
    props: ['product']
}
</script>

<style>
.product{
    margin-top: 2%;
}
</style>