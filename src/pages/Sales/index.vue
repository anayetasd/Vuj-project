<template>
  <div class="customer-container">
    <div class="top-bar">
      <h1>Manage Sales</h1>
      <router-link class="btn btn-primary" to="/sales/create">+ New Sale</router-link>
    </div>

    <div class="table-responsive">
      <table class="table customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total Amount</th>
            <th>Discount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sale in sales" :key="sale.id">
            <td>{{ sale.id }}</td>
            <td>{{ sale.customer?.name || 'No Customer' }}</td>
            <td>{{ formatNumber(sale.total_amount) }}</td>
            <td>{{ formatNumber(sale.discount) }}</td>
            <td>
              <span
                class="badge"
                :class="sale.status === 'confirmed' ? 'bg-secondary text-white' : 'bg-light text-dark'"
              >
                {{ capitalize(sale.status) }}
              </span>
            </td>
            <td>
              <div class="btn-group">
                <router-link  class="btn btn-info btn-sm" :to="`/sales/${sale.id}`">View</router-link>
                <router-link  class="btn btn-warning btn-sm":to="`/sales/${sale.id}/edit`">Edit</router-link>
                <router-link  class="btn btn-danger btn-sm":to="`/sales/delete/${sale.id}`">Delete</router-link>
                
              </div>
            </td>
          </tr>

          <tr v-if="sales.length === 0">
            <td colspan="6" class="text-muted">No Sales Found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sales = ref([]);

const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`;
const endpoint = `sales`;

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    sales.value = data.sales ?? data;
  } catch (error) {
    console.error('Fetch Error:', error);
  }
});

const formatNumber = (num) => parseFloat(num).toFixed(2);
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const confirmDelete = async (id) => {
  if (confirm('Are you sure you want to delete this sale?')) {
    try {
      const res = await fetch(`${baseUrl}sales/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (res.ok) {
        sales.value = sales.value.filter(s => s.id !== id);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  }
};
</script>

<style scoped>
.customer-container {
  width: 1200px;
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

.badge {
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 12px;
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
