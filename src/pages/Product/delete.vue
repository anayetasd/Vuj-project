<template>
  <div class="confirm-container">
    <router-link class="btn btn-success" to="/products">← Back</router-link>

    <p>Are you sure you want to delete this product?</p>
    <h2>Product Id: {{ product.id }}</h2>
    <h2> Product Name:{{ product.name }}</h2>
    <h2>Product Price:{{ product.regular_price }}</h2>

    <form @submit.prevent="handleDelete">
      <input class="btn btn-danger" type="submit" value="Confirm" />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productId = route.params.id

const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api'
const product = ref({})

onMounted(async () => {
  try {
    const res = await fetch(`${baseUrl}/products/${productId}`)
    const data = await res.json()
    product.value = data.product ?? data
  } catch (err) {
    console.error('Fetch error:', err)
  }
})

async function handleDelete() {
  if (confirm("Are you sure?")) {
    try {
      await fetch(`${baseUrl}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        }
      })
      router.push('/products')
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }
}
</script>

<style scoped>
.confirm-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff3f3;
  border: 1px solid #f5c6cb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.confirm-container h2 {
  color: #dc3545;
  margin-bottom: 20px;
  padding: 0 10px;
}

.confirm-container p {
  font-size: 18px;
  margin-bottom: 30px;
  font-weight: 600;
}

.btn-danger {
  padding: 10px 25px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
}

.btn-success {
  margin-bottom: 20px;
  display: inline-block;
}
</style>
