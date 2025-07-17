<template>
  <div class="container table-container">
    <router-link class="btn btn-info" to="/products/create">➕ New Product</router-link>

    <table class="table table-bordered table-hover align-middle">
      <thead>
        <tr class="text-center">
          <th>Id</th>
          <th>Product Name</th>
          <th>Name</th>
          <th>Regular Price</th>
          <th>Offer Price</th>
          <th>Barcode</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="products.length === 0">
          <td colspan="7" class="text-center text-muted">No Product Found</td>
        </tr>
        <tr v-for="product in products" :key="product.id" class="text-center">
          <td>{{ product.id }}</td>
          <td>
           {{ product.name }}
          </td>
          <td>{{ product.name }}</td>
          <td class="text-danger fw-bold">{{ product.regular_price }}</td>
          <td class="text-success fw-bold">{{ product.offer_price }}</td>
          <td>{{ product.barcode }}</td>
          <td>
            <div class="btn-group">
              <router-link class="btn btn-sm btn-primary" :to="`/products/${product.id}/edit`">Edit</router-link>
              <router-link class="btn btn-sm btn-success" :to="`/products/${product.id}`">View</router-link>
              <router-link class="btn btn-sm btn-danger" :to="`/products/delete/${product.id}`">Delete</router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-center mt-3">
      <nav v-if="pagination.total > pagination.per_page">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !pagination.prev_page_url }">
            <button class="page-link" @click="fetchProducts(pagination.current_page - 1)">Previous</button>
          </li>
          <li
            class="page-item"
            v-for="page in totalPages"
            :key="page"
            :class="{ active: page === pagination.current_page }"
          >
            <button class="page-link" @click="fetchProducts(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: !pagination.next_page_url }">
            <button class="page-link" @click="fetchProducts(pagination.current_page + 1)">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const products = ref([])
const pagination = ref({
  current_page: 1,
  last_page: 1,
  total: 0,
  per_page: 10,
  next_page_url: null,
  prev_page_url: null
})

const fetchProducts = async (page = 1) => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/products?page=${page}`)
    const data = await res.json()
    products.value = data.products
    pagination.value = {
      current_page: data.current_page,
      last_page: data.last_page,
      total: data.total,
      per_page: data.per_page,
      next_page_url: data.next_page_url,
      prev_page_url: data.prev_page_url
    }
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

const totalPages = computed(() => {
  return Array.from({ length: pagination.value.last_page }, (_, i) => i + 1)
})

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}

.table-container {
  margin-top: 50px;
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.table img {
  border-radius: 8px;
}

.table th {
  background-color: #0d6efd;
  color: white;
}

.btn-group a {
  margin-right: 5px;
}

.btn-info {
  margin-bottom: 20px;
}
</style>
