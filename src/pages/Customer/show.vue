<script setup>
  import {ref, onMounted } from 'vue' 
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const customerId = route.params.id;

  const customer = ref({});

  const baseUrl=`http://anayet.intelsofts.com/project_app/public/api/`
  const endpoint=`customers/${customerId}`

  onMounted(async () => {  
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method:'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept':'application/json'        
        }
      });  

      let c= await response.json();    
      customer.value = c;
    } catch (err) {
      console.error('Fetch Error:', err);
      throw err;
    }
  })
</script>

<template>    
  <div class="details-container">
    <h1>Customer Details</h1>
    <router-link class="btn-back" to="/customers">← Back</router-link>

    <div class="customer-info" v-if="customer.name">
      <p><strong>Name:</strong> {{ customer.name }}</p>
      <p><strong>Mobile:</strong> {{ customer.mobile }}</p>
      <p><strong>Email:</strong> {{ customer.email }}</p>
    </div>

    <div v-else>
      <p>Loading customer details...</p>
    </div>
  </div>
</template>

<style scoped>
.details-container {
  width: 980px;
  margin: 50px auto;
  padding: 25px 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

h1 {
  text-align: center;
  color: #0d6efd;
  margin-bottom: 25px;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  color: #6c757d;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.btn-back:hover {
  color: #495057;
}

.customer-info p {
  font-size: 16px;
  line-height: 1.6;
  margin: 12px 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.customer-info p strong {
  color: #0d6efd;
}
</style>
