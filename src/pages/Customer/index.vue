<template>
  <div class="container mt-4">
    <router-link to="/customers/create" class="btn btn-info mb-3 fw-bold">
      + New Customer
    </router-link>

    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="text-white" style="background: linear-gradient(to right, #0d6efd, #3b82f6)">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Address</th>
            <th>Photo</th>
            <th style="width: 180px">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="customers.length === 0">
            <td colspan="7" class="text-center text-muted fw-bold py-4">No customers found.</td>
          </tr>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.mobile }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.address }}</td>
            <td>
              <img
                v-if="customer.photo"
                :src="`${imageBaseUrl}${customer.photo}`"
                :alt="customer.name"
                style="width: 60px; height: 60px; object-fit: cover; border-radius: 50%"
              />
              <span v-else class="text-muted">No Photo</span>
            </td>
            <td>
              <div class="btn-group">
                <router-link :to="`/customers/${customer.id}/edit`" class="btn btn-primary btn-sm">Edit</router-link>
                <router-link :to="`/customers/${customer.id}`" class="btn btn-success btn-sm">View</router-link>
                <router-link :to="`/customers/${customer.id}/confirm`" class="btn btn-warning btn-sm">Delete</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const customers = ref([])
const imageBaseUrl = 'http://anayet.intelsofts.com/project_app/public/uploads/customers/'

const fetchCustomers = async () => {
  try {
    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/customers')
    const data = await res.json()
    customers.value = data.customers || []
  } catch (error) {
    console.error('Failed to fetch customers', error)
  }
}

onMounted(() => {
  fetchCustomers()
})
</script>
