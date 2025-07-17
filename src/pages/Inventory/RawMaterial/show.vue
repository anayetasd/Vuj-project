<template>
  <div>
    <router-link class="btn-back" to="/rawmaterials">← Back</router-link>

    <div class="detail-container" v-if="rawMaterial">
      <h2>Raw Material Details</h2>
      <table class="detail-table">
            <tbody>
                <tr>
                <td>Id</td>
                <td>{{ rawMaterial.id }}</td>
                </tr>
                <tr>
                <td>Name</td>
                <td>{{ rawMaterial.name }}</td>
                </tr>
                <tr>
                <td>Unit</td>
                <td>{{ rawMaterial.unit }}</td>
                </tr>
                <tr>
                <td>Price per Unit</td>
                <td>{{ rawMaterial.price_per_unit }}</td>
                </tr>
            </tbody>
        </table>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue' 
import { useRoute } from 'vue-router'

const route = useRoute()
const rawMaterialId = route.params.id
const rawMaterial = ref({})

const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`
const endpoint = `rawmaterials/${rawMaterialId}`

onMounted(async () => {  
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'        
      }
    })  

    const c = await response.json()
    rawMaterial.value = c.rawmaterial ?? c 

    console.log("Raw Material Fetched:", rawMaterial.value)
  } catch (err) {
    console.error('Fetch Error:', err)
  }
})
</script>


<style scoped>
.detail-container {
  max-width: 950px;
  margin: 40px auto;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  font-family: "Segoe UI", sans-serif;
}

.detail-container h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #005792;
}

table.detail-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

table.detail-table tr {
  border-bottom: 1px solid #ddd;
}

table.detail-table td {
  padding: 12px 15px;
}

table.detail-table td:first-child {
  font-weight: 600;
  color: #333;
  width: 35%;
  background-color: #f3f6f9;
}

table.detail-table td:last-child {
  background-color: #fff;
}

.btn-back {
  display: inline-block;
  margin: 20px auto 10px 40px;
  text-decoration: none;
  background-color: #28a745;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 15px;
}

.btn-back:hover {
  background-color: #218838;
}
</style>
