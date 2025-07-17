<template>
  <div class="confirm-container">
    <router-link class="btn btn-success" to="/productions">← Back</router-link>

    <p>Are you sure you want to delete this production?</p>

    <h2>Production Date: {{ production.production_date }}</h2>
    <h2>Product Name: {{ production.product?.name || 'no name' }}</h2>
    <h2>Total Produced: {{ production.quantity_produced }}</h2>

    <button class="btn btn-danger" @click="handleDelete">Confirm Delete</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const productionId = route.params.id
const production = ref({})

const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/'
const endpoint = `productions/${productionId}`

// Fetch production details
onMounted(async () => {
  try {
    const res = await fetch(baseUrl + endpoint, {
      headers: {
        'Accept': 'application/json',
      },
    })
    const data = await res.json()
    production.value = data.production
  } catch (err) {
    console.error('Fetch Error:', err)
  }
})

// Delete production
async function handleDelete() {
  if (!confirm('Are you sure you want to delete this production?')) return

  try {
    const res = await fetch(baseUrl + endpoint, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (res.ok) {
      alert('Production deleted successfully.')
      router.push('/productions')
    } else {
      const data = await res.json()
      alert('Delete failed: ' + data.message)
    }
  } catch (err) {
    console.error('Delete Error:', err)
    alert('Error deleting production.')
  }
}
</script>

<style scoped>
.confirm-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.confirm-container h2 {
  margin: 10px 0;
  color: #333;
}

.confirm-container p {
  font-size: 18px;
  color: #555;
  margin-bottom: 25px;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
  padding: 10px 25px;
  color: #fff;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-success {
  margin: 20px;
  padding: 8px 20px;
  background-color: #28a745;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
}
</style>
