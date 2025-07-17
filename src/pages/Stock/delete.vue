<template>
  <div class="confirm-container" v-if="stock">
    <router-link class="btn btn-success btn-back" to="/stocks">← Back</router-link>

    <h3>Are you sure you want to delete this stock?</h3>

    <div class="confirm-details">
      <p><strong>ID:</strong> {{ stock.id }}</p>
      <p><strong>Product:</strong> {{ stock.product?.name || 'N/A' }}</p>
      <p><strong>Qty:</strong> {{ stock.qty }}</p>
      <p><strong>Warehouse:</strong> {{ stock.warehouse?.name || 'N/A' }}</p>
    </div>

    <form @submit.prevent="handleDelete">
      <input type="submit" class="btn btn-danger" value="Yes, Delete" />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const stockId = route.params.id

const stock = ref(null)

const fetchStock = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${stockId}`)
    const data = await res.json()
    stock.value = data.stock || data
  } catch (error) {
    alert('Failed to load stock data.')
    router.push('/stocks')
  }
}

const handleDelete = async () => {
  if (!confirm('This action cannot be undone. Are you sure?')) return

  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${stockId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) {
      alert('✅ Stock deleted successfully.')
      router.push('/stocks')
    } else {
      const errorData = await res.json()
      alert('❌ Delete failed: ' + (errorData.message || 'Unknown error'))
    }
  } catch (error) {
    alert('❌ Delete failed due to server error.')
  }
}

onMounted(() => {
  fetchStock()
})
</script>

<style scoped>
.confirm-container {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
}

.confirm-container h3 {
  margin-bottom: 25px;
  font-weight: 700;
  color: #dc3545; /* Bootstrap danger color */
}

.confirm-details {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  text-align: left;
  font-size: 1.1rem;
  color: #333;
  box-shadow: inset 0 0 10px #e9ecef;
}

.confirm-details strong {
  display: inline-block;
  width: 110px;
}

.btn-danger {
  width: 100%;
  font-weight: 600;
  padding: 10px 0;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  border: none;
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #b02a37;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
}
</style>
