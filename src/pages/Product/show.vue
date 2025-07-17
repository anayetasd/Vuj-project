<template>
  <div class="product-details-container">
    <router-link class="btn btn-success" to="/products">← Back</router-link>

    <h2>Product Details</h2>

    <table class="product-details-table" v-if="product">

      <tbody>   
            <tr>
              <td>Id</td>
              <td>{{ product.id }}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{{ product.name }}</td>
            </tr>
            <tr>
              <td>Photo</td>
              <td>
                <img :src="`/img/${product.photo}`" :alt="product.name" />
              </td>
            </tr>

       </tbody>
    </table>

    <div v-else class="text-center text-muted">
      Loading product data...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productId = route.params.id
const product = ref(null)

const fetchProduct = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/products/${productId}`)
    const data = await res.json()
    product.value = data.product
  } catch (error) {
    console.error('Failed to fetch product:', error)
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.product-details-container {
  max-width: 950px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.product-details-container h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #343a40;
}

.product-details-table {
  width: 100%;
  border-collapse: collapse;
}

.product-details-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #dee2e6;
  font-size: 16px;
}

.product-details-table td:first-child {
  font-weight: bold;
  color: #495057;
  width: 30%;
}

.product-details-table img {
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  border: 1px solid #ced4da;
}

.btn-success {
  margin-bottom: 20px;
  display: inline-block;
}
</style>
