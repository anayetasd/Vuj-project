<template>
  <div class="container mt-5 bg-white p-4 rounded shadow">
    <router-link to="/products/create" class="btn btn-info fw-bold mb-3">
      ➕ New Product
    </router-link>

    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="text-white text-center" style="background-color: #0d6efd;">
          <tr>
            <th>Id</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Regular Price</th>
            <th>Offer Price</th>
            <th>Barcode</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="products.length === 0">
            <td colspan="7" class="text-center text-muted py-3">
              🚫 No Product Found
            </td>
          </tr>
          <tr v-for="product in products" :key="product.id" class="text-center">
            <td>{{ product.id }}</td>
            <td>
              <img
                :src="`http://anayet.intelsofts.com/project_app/public/uploads/products/${product.photo}`"
                :alt="product.name"
                width="80"
                height="80"
                style="border-radius: 8px; object-fit: cover;"
              />
            </td>
            <td>{{ product.name }}</td>
            <td class="text-danger fw-bold">{{ product.regular_price }}</td>
            <td class="text-success fw-bold">{{ product.offer_price }}</td>
            <td>{{ product.barcode }}</td>
            <td>
              <div class="btn-group">
                <router-link :to="`/products/${product.id}/edit`" class="btn btn-sm btn-primary">Edit</router-link>
                <router-link :to="`/products/${product.id}`" class="btn btn-sm btn-success">View</router-link>
                <router-link :to="`/products/${product.id}/confirm`" class="btn btn-sm btn-danger">Delete</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const products = ref([]);

const fetchProducts = async () => {
  try {
    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/products');
    const data = await res.json();
    products.value = data.products || [];
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

onMounted(fetchProducts);
</script>
