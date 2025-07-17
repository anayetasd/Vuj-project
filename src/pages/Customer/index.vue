<template>
  <div class="customer-container">
    <div class="top-bar">
      <h1>Manage Customers</h1>
      <router-link class="btn btn-primary" to="/customers/create">+ New Customer</router-link>
    </div>

    <div class="table-responsive">
      <table class="table customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td>
              <img
                :src="`http://anayet.intelsofts.com/project_app/public/img/${customer.photo}`"
                alt="Photo"
                class="customer-photo"
              />
            </td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.mobile }}</td>
            <td>{{ customer.email }}</td>
            <td>
              <div class="btn-group">
                <router-link :to="`/customers/${customer.id}`" class="btn btn-info btn-sm">View</router-link>
                <router-link :to="`/customers/${customer.id}/edit`" class="btn btn-warning btn-sm">Edit</router-link>
                <router-link :to="`/customers/delete/${customer.id}`" class="btn btn-danger btn-sm">Delete</router-link>
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

const customers = ref([]);

const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`;
const endpoint = `customers`;

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const c = await response.json();
    customers.value = c.customers;
    console.log(c.customers);
  } catch (err) {
    console.error('Fetch Error:', err);
    throw err;
  }
});
</script>

<style scoped>
.customer-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.top-bar h1 {
  color: #0d6efd;
  font-size: 26px;
}

.table-responsive {
  overflow-x: auto;
}

.customer-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
}

.customer-table th {
  background-color: #0d6efd;
  color: #ffffff;
  padding: 14px;
  font-size: 15px;
  text-align: center;
}

.customer-table td {
  padding: 12px;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
}

.customer-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.customer-table tr:hover {
  background-color: #eef6ff;
}

.customer-photo {
  height: 80px;
  width: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #dee2e6;
}

.btn-group .btn {
  margin-right: 5px;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
}
</style>
