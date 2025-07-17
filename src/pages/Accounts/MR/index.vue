<template>
  <div class="purchase-container">
    <div class="top-bar">
      <h2>Money Receipts</h2>
      <router-link to="/mrs/create">+ Add New Receipt</router-link>
    </div>

    <table class="purchase-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Receipt Date</th>
          <th>Shipping Address</th>
          <th>Receipt Total</th>
          <th>Paid Amount</th>
          <th>Discount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mr in mrs" :key="mr.id">
          <td>{{ mr.id }}</td>
          <td>{{ mr.customer?.name || 'No Name' }}</td>
          <td>{{ mr.receipt_date || '2024-06-24' }}</td>
          <td>{{ mr.shipping_address || 'Barishal' }}</td>
          <td>{{ formatNumber(mr.receipt_total) }}</td>
          <td>{{ formatNumber(mr.paid_amount) }}</td>
          <td>{{ formatNumber(mr.discount) }}</td>
          <td>
            <div class="btn-group">
              <router-link  class="btn-primary":to="`/mrs/${mr.id}/edit`">Edit</router-link>
              <router-link  class="btn-success":to="`/mrs/${mr.id}`">View</router-link>
              <router-link  class="btn-warning":to="`/mrs/delete/${mr.id}`">Delete</router-link>
              
            </div>
          </td>
        </tr>
        <tr v-if="mrs.length === 0">
          <td colspan="8">No receipts found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination placeholder -->
    <!-- <div class="pagination"> ... </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mrs = ref([])

const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/'
const endpoint = 'mrs'

const fetchMrs = async () => {
  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const data = await res.json()
    mrs.value = data.mrs ?? data // API structure check
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

const confirmDelete = async (id) => {
  if (confirm('Are you sure you want to delete this receipt?')) {
    try {
      const res = await fetch(`${baseUrl}mrs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      if (res.ok) {
        mrs.value = mrs.value.filter(mr => mr.id !== id)
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }
}

const formatNumber = (num) => parseFloat(num).toFixed(2)

onMounted(fetchMrs)
</script>

<style scoped>
.purchase-container {
  width: 1200px;
  margin: 30px auto;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.top-bar h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.top-bar a,
.top-bar router-link {
  padding: 8px 14px;
  background-color: #17a2b8;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}

.top-bar a:hover,
.top-bar router-link:hover {
  background-color: #138496;
}

table.purchase-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  background-color: white;
}

table.purchase-table th,
table.purchase-table td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: center;
  font-size: 14px;
}

table.purchase-table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

table.purchase-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.btn-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
}

.btn-group a,
.btn-group button {
  padding: 5px 10px;
  font-size: 13px;
  border: none;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-success {
  background-color: #28a745;
}

.btn-warning {
  background-color: #ffc107;
  color: black;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 6px;
  flex-wrap: wrap;
}

.pagination > * {
  padding: 6px 10px;
  border: 1px solid #ccc;
  text-decoration: none;
  color: #333;
  border-radius: 4px;
  font-size: 14px;
}

.pagination .active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

@media (max-width: 768px) {
  table.purchase-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
</style>
