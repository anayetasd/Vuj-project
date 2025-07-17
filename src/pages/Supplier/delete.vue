<script setup>
import { ref, onMounted } from 'vue' 
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const supplierId = route.params.id

const supplier = ref({})

const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`
const endpoint = `suppliers/${supplierId}`

async function handleDelete() {      
  if (confirm("Are you sure?")) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'        
        }
      })
      if (response.ok) {
        alert("✅ Supplier deleted successfully!")
        router.push('/suppliers')
      } else {
        alert('❌ Delete failed!')
      }
    } catch (err) {
      console.error('Fetch Error:', err)
      alert('❌ Delete failed due to error!')
    }
  }
}

onMounted(async () => {  
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'        
      }
    })

    const data = await response.json()
    supplier.value = data.supplier
  } catch (err) {
    console.error('Fetch Error:', err)
  }
})
</script>

<template>    
  <div class="delete-container">
    <h1>🗑 Delete Supplier</h1>    

    <router-link class="btn-back" to="/suppliers">← Back to List</router-link>

    <div class="confirm-box">
      <h4>Are you sure you want to delete this supplier?</h4>

      <p><strong>ID:</strong> {{ supplier.id }}</p>
      <p><strong>Name:</strong> {{ supplier.name }}</p>

      <button @click="handleDelete" class="btn-delete">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.delete-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
  text-align: center;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #d32f2f;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  color: #1976d2;
  text-decoration: none;
  font-weight: bold;
}

.confirm-box {
  background-color: #fefefe;
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
}

.confirm-box h4 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.confirm-box p {
  font-size: 16px;
  margin: 6px 0;
}

.btn-delete {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #c62828;
}
</style>
