<template>
  <div class="container">
    <router-link class="btn btn-success btn-back" to="/products">⬅ Back</router-link>

    <div class="form-container">
      <h2>Edit Product</h2>

      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="mb-3">
          <label class="form-label">Product Name</label>
          <input v-model="form.name" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Current Photo</label><br />
          <img v-if="product?.photo" :src="`/img/${product.photo}`" alt="Product" width="100" class="mb-2 rounded" />
          <input type="file" @change="handleFileChange" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Regular Price</label>
          <input v-model="form.regular_price" type="text" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Offer Price</label>
          <input v-model="form.offer_price" type="text" class="form-control" />
        </div>

        <div class="mb-3">
          <label class="form-label">Barcode</label>
          <input v-model="form.barcode" type="text" class="form-control" />
        </div>

        <button type="submit" class="btn btn-primary w-100">💾 Update Product</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const productId = route.params.id
const product = ref({})
const form = ref({
  name: '',
  photo: null,
  regular_price: '',
  offer_price: '',
  barcode: '',
})

const baseURL = 'http://anayet.intelsofts.com/project_app/public/api'

const fetchProduct = async () => {
  const res = await fetch(`${baseURL}/products/${productId}`)
  const data = await res.json()
  product.value = data.product
  form.value = {
    name: data.product.name,
    photo: null,
    regular_price: data.product.regular_price,
    offer_price: data.product.offer_price,
    barcode: data.product.barcode,
  }
}

const handleFileChange = (e) => {
  form.value.photo = e.target.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()
  Object.entries(form.value).forEach(([key, val]) => {
    if (val !== null) formData.append(key, val)
  })

  await fetch(`${baseURL}/products/${productId}`, {
    method: 'POST',
    headers: {
      'X-HTTP-Method-Override': 'PUT'
    },
    body: formData
  })

  router.push('/products')
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.form-container {
  max-width: 1000px;
  margin: 50px auto;
  background-color: #fff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  margin-bottom: 25px;
  text-align: center;
}

.btn-back {
  margin-bottom: 20px;
}

.form-control:focus,
.form-select:focus {
  box-shadow: none;
  border-color: #198754;
}
</style>
