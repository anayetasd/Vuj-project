


<script setup>
import { ref, onMounted } from 'vue' 
import { useRoute } from 'vue-router'

const route = useRoute()
const finishedGoodId = route.params.id
const finishedGood = ref({})

const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`
const endpoint = `finishedgoods/${finishedGoodId}`

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
    finishedGood.value = c.finishedgood ?? c 

    console.log("Raw Material Fetched:", finishedGood.value)
  } catch (err) {
    console.error('Fetch Error:', err)
  }
})
</script>



<template>
  <div class="show-container">
    <router-link class="btn-back" to="/finishedGoods">← Back to Finished Goods</router-link>

    <h2>Finished Good Details</h2>

    <table class="details-table" v-if="finishedGood">
        <tbody>
            <tr>
                <td>ID</td>
                <td>{{ finishedGood.id }}</td>
            </tr>
            <tr>
                <td>Product Name</td>
                <td>{{ finishedGood.product_name }}</td>
            </tr>
            <tr>
                <td>Quantity</td>
                <td>{{ finishedGood.quantity }}</td>
            </tr>
            <tr>
                <td>Price</td>
                <td>{{ finishedGood.price }}</td>
            </tr>
            <tr>
                <td>Order Date</td>
                <td>{{ finishedGood.order_date }}</td>
            </tr>
            <tr>
                <td>Status</td>
                <td>{{ finishedGood.finished_good_status }}</td>
            </tr>

      </tbody>
    </table>

    
  </div>
</template>


<style scoped>
.show-container {
  max-width: 1150px;
  margin: 40px auto;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.show-container h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #0d6efd;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  color: white;
  background: #28a745;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  transition: 0.3s;
}

.btn-back:hover {
  background: #218838;
}

.details-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.details-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  font-size: 15px;
  color: #333;
}

.details-table td:first-child {
  font-weight: bold;
  background-color: #f8f9fa;
  width: 40%;
}
</style>
