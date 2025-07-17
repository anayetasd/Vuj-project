<script setup>
  import { ref, onMounted } from 'vue' 
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const customerId = route.params.id

  const customer = ref({})

  const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`
  const endpoint = `customers/${customerId}`

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
          router.push('/customers')
        } else {
          alert('Delete failed!')
        }
      } catch (err) {
        console.error('Fetch Error:', err)
        alert('Delete failed due to error!')
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
      customer.value = data
    } catch (err) {
      console.error('Fetch Error:', err)
    }
  })
</script>

<template>    
  <div class="delete-container">
    <h1>Delete Customer</h1>    

    <router-link class="btn-back" to="/customers">← Back</router-link>

    <div class="confirm-box">
      <h4>Are you sure you want to delete this customer?</h4>

      <p><strong>Name:</strong> {{ customer.name }}</p>
      <p><strong>Mobile:</strong> {{ customer.mobile }}</p>
      <p><strong>Email:</strong> {{ customer.email }}</p>

      <button @click="handleDelete" class="btn-delete">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.delete-container {
  max-width: 480px;
  margin: 50px auto;
  background-color: #fff5f5;
  border: 1px solid #f5c6cb;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(220, 53, 69, 0.3);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-align: center;
}

h1 {
  color: #dc3545;
  margin-bottom: 20px;
}

.btn-back {
  display: inline-block;
  margin-bottom: 30px;
  background-color: #6c757d;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
  background-color: #5a6268;
}

.confirm-box h4 {
  margin-bottom: 25px;
  font-weight: 600;
  color: #a71d2a;
}

.confirm-box p {
  font-size: 16px;
  margin: 8px 0;
  color: #4a4a4a;
}

.btn-delete {
  margin-top: 30px;
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-delete:hover {
  background-color: #a71d2a;
}
</style>
