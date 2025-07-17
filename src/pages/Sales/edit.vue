<template>
  <div class="edit-container">
    <button @click="goBack" class="btn-back">Back</button>

    <h2 class="form-title">Edit Sale</h2>

    <form @submit.prevent="handleUpdate">
      <div class="form-group">
        <label for="id">ID</label>
        <input type="text" v-model="sale.id" id="id" required />
      </div>

      <div class="form-group">
        <label for="customer_id">Customer ID</label>
        <select v-model="sale.customer_id" id="customer_id" required>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="total_amount">Total Amount</label>
        <input type="text" v-model="sale.total_amount" id="total_amount" required />
      </div>

      <div class="form-group">
        <label for="discount">Discount</label>
        <input type="text" v-model="sale.discount" id="discount" />
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <input type="text" v-model="sale.status" id="status" />
      </div>

      <div class="form-group">
        <label for="created_at">Created At</label>
        <textarea v-model="sale.created_at" id="created_at"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-submit">Update</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sale = ref({
  id: '',
  customer_id: '',
  total_amount: '',
  discount: '',
  status: '',
  created_at: '',
})

const customers = ref([])

// Fetch sale data by id
const fetchSale = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/sales/${route.params.id}`)
    if (!res.ok) throw new Error('Failed to fetch sale')

    const data = await res.json()
    console.log('Sale API Response:', data)
    sale.value = data.sale ?? data.sales ?? data
  } catch (error) {
    alert(error.message)
    router.push('/sales')
  }
}

// Fetch customers list
const fetchCustomers = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/customers`)
    if (!res.ok) throw new Error('Failed to fetch customers')

    const data = await res.json()
    console.log('Customers API Response:', data)
    customers.value = data.customers ?? data
  } catch (error) {
    alert(error.message)
  }
}

// On mount load data
onMounted(() => {
  fetchSale()
  fetchCustomers()
})

// Go back to sales list
const goBack = () => {
  router.push('/sales')
}

// Handle form submit to update sale
const handleUpdate = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/sales/${sale.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sale.value),
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to update sale')
    }

    alert('Sale updated successfully')
    router.push('/sales')
  } catch (error) {
    alert('Error: ' + error.message)
  }
}
</script>


<style scoped>
.edit-container {
  max-width: 1000px;
  margin: 50px auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.form-title {
  text-align: center !important;
  margin-bottom: 30px;
  font-size: 28px !important;
  font-weight: bold;
  color: #333;
  display: block !important;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;
}
.btn-back:hover {
  background-color: #218838;
  color: white;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
}

.form-group input[type="text"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  background-color: #fafafa;
  resize: vertical;
}

.form-actions {
  text-align: center;
  margin-top: 30px;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  padding: 12px 28px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  transition: 0.3s ease;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0056b3;
}
</style>
