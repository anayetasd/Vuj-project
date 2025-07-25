<script setup>
import { ref, onMounted } from 'vue'

const purchases = ref([])
const pagination = ref({})
const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/purchases'

// Current page tracking
const currentPage = ref(1)

const fetchPurchases = async (page = 1) => {
  try {
    const response = await fetch(`${baseUrl}?page=${page}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
    const data = await response.json()

    purchases.value = data.purchases      
    pagination.value = {
      current_page: data.current_page,
      last_page: data.last_page,
    }
  } catch (error) {
    console.error('Error fetching purchases:', error)
  }
}

const goToPage = (page) => {
  currentPage.value = page
  fetchPurchases(page)
}

onMounted(() => {
  fetchPurchases()
})
</script>

<template>
  <div class="container purchase-container">
    <div class="top-bar">
       <router-link class="btn btn-info" to="/purchases/create">Add New Purchases</router-link>
    </div>

    <table class="table purchase-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Supplier</th>
          <th>Purchase Date</th>
          <th>Shipping Address</th>
          <th>Purchase Total</th>
          <th>Paid Amount</th>
          <th>Discount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="purchase in purchases" :key="purchase.id">
          <td>{{ purchase.id }}</td>
          <td>{{ purchase.supplier?.name || 'no name' }}</td>
          <td>{{ purchase.purchase_date }}</td>
          <td>{{ purchase.shipping_address }}</td>
          <td>{{ purchase.purchase_total }}</td>
          <td>{{ purchase.paid_amount }}</td>
          <td>{{ purchase.discount }}</td>
          <td>
            <div class="btn-group">
              <router-link class="btn btn-primary" :to="`/purchases/${purchase.id}/edit`">Edit</router-link>
              <router-link class="btn btn-success" :to="`/purchases/${purchase.id}`">View</router-link>
              <router-link class="btn btn-warning" :to="`/purchases/delete/${purchase.id}`">Delete</router-link>
            </div>
          </td>
        </tr>
        <tr v-if="purchases.length === 0">
          <td colspan="8">No purchases found.</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination d-flex justify-content-center mt-4">
      <button
        class="btn btn-sm btn-outline-secondary me-1"
        :disabled="pagination.current_page === 1"
        @click="goToPage(pagination.current_page - 1)"
      >
        Previous
      </button>

      <button
        v-for="page in pagination.last_page"
        :key="page"
        class="btn btn-sm"
        :class="pagination.current_page === page ? 'btn-primary' : 'btn-outline-secondary'"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
        class="btn btn-sm btn-outline-secondary ms-1"
        :disabled="pagination.current_page === pagination.last_page"
        @click="goToPage(pagination.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.purchase-container {
  padding: 20px;
  background: #f9f9f9;
}

.purchase-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.purchase-table th,
.purchase-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
}

.purchase-table th {
  background-color: #007bff;
  color: white;
}

.purchase-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.btn-group .btn {
  margin-right: 5px;
}

.top-bar {
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}
</style>
