<template>
  <div class="show-container" v-if="stock">
    <router-link class="btn btn-success btn-back" to="/stocks">← Back</router-link>

    <h3>Stock Details</h3>

    <table class="table table-bordered">
      <tbody>  
          <tr>
            <th>ID</th>
            <td>{{ stock.id }}</td>
          </tr>
          <tr>
            <th>Product Name</th>
            <td>{{ stock.product?.name || 'no name' }}</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>{{ stock.qty }}</td>
          </tr>
          <tr>
            <th>Transaction Type</th>
            <td>{{ stock.transaction_type?.name || 'no name' }}</td>
          </tr>
          <tr>
            <th>Warehouse</th>
            <td>{{ stock.warehouse?.name || 'no name' }}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{{ formatDate(stock.created_at) }}</td>
          </tr>

       </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const stockId = route.params.id
const stock = ref(null)

const fetchStock = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${stockId}`)
    const data = await res.json()
    stock.value = data.stock || data // support both { stock: {...} } or direct object
  } catch (error) {
    console.error('Error fetching stock:', error)
  }
}

const formatDate = (dateStr) => {
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }
  return new Date(dateStr).toLocaleString('en-US', options)
}

onMounted(fetchStock)
</script>

<style scoped>
.show-container {
  max-width: 900px;
  margin: 40px auto;
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
}
.show-container h3 {
  margin-bottom: 25px;
  font-weight: 600;
  text-align: center;
  color: #333;
}
.table th, .table td {
  vertical-align: middle;
  padding: 12px 15px;
}
.btn-back {
  margin-bottom: 20px;
}
</style>
