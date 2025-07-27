
<script setup>
  import {ref, onMounted } from 'vue' 
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const supplierId = route.params.id;

  const supplier = ref({});

  const baseUrl=`http://anayet.intelsofts.com/project_app/public/api/`
  const endpoint=`suppliers/${supplierId}`

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
      supplier.value = c.supplier;
    } catch (err) {
      console.error('Fetch Error:', err);
      throw err;
    }
  })
</script>


<template>
  <div class="view-container">
    <router-link class="btn btn-success btn-back" to="/suppliers">← Back to Suppliers</router-link>

    <h2>Supplier Details</h2>

  <table class="table-custom" v-if="supplier">
    <tbody>
      <tr>
        <td>Id</td>
        <td>{{ supplier.id }}</td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{{ supplier.name }}</td>
      </tr>
      <tr>
        <td>Mobile</td>
        <td>{{ supplier.mobile }}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{{ supplier.email }}</td>
      </tr>
    </tbody>
  </table>
    <p v-else>Loading supplier details...</p>
  </div>
</template>

<style scoped>
.view-container {
  max-width: 1150px;
  margin: 40px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.view-container h2 {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 600;
  color: #0d6efd;
}

.table-custom {
  width: 100%;
  border-collapse: collapse;
}

.table-custom td {
  padding: 12px 15px;
  border-bottom: 1px solid #e0e0e0;
}

.table-custom td:first-child {
  font-weight: 600;
  background-color: #f8f9fa;
  width: 30%;
}

.supplier-photo {
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.btn-back {
  margin-bottom: 20px;
  display: inline-block;
}
</style>
