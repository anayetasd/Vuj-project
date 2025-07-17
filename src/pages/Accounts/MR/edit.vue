<template>
  <div class="form-container">
    <router-link class="btn-back" to="/mrs">← Back to Money Receipt</router-link>

    <h2>Edit Money Receipt</h2>

    <form @submit.prevent="updateReceipt">
      <div class="form-group">
        <label for="customer_id">Customer</label>
        <select v-model="form.customer_id" id="customer_id" required>
          <option value="" disabled>Select a customer</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="receipt_total">Receipt Total</label>
        <input type="number" id="receipt_total" v-model="form.receipt_total" required />
      </div>

      <div class="form-group">
        <label for="discount">Discount</label>
        <input type="number" step="0.01" id="discount" v-model="form.discount" />
      </div>

      <button type="submit" class="btn-submit">Update Money Receipt</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const customers = ref([])
const form = ref({
  customer_id: '',
  receipt_total: '',
  discount: ''
})

const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api'

// Fetch single MR + customers
const fetchData = async () => {
  try {
    const [mrRes, customerRes] = await Promise.all([
      fetch(`${baseUrl}/mrs/${id}`),
      fetch(`${baseUrl}/customers`)
    ])
    const mrData = await mrRes.json()
    const customerData = await customerRes.json()

    form.value.customer_id = mrData.mr.customer_id
    form.value.receipt_total = mrData.mr.receipt_total
    form.value.discount = mrData.mr.discount

    customers.value = customerData.customers ?? customerData
  } catch (err) {
    console.error('Fetch Error:', err)
  }
}

// Submit update
const updateReceipt = async () => {
  try {
    const response = await fetch(`${baseUrl}/mrs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (response.ok) {
      alert('Money Receipt updated successfully!')
      router.push('/mrs')
    } else {
      alert('Update failed.')
    }
  } catch (err) {
    console.error('Update Error:', err)
  }
}

onMounted(fetchData)
</script>

<style scoped>
.form-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-container h2 {
  margin-bottom: 25px;
  text-align: center;
  color: #28a745;
  font-size: 28px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
  color: #333;
}

input[type="text"],
input[type="number"],
input[type="date"],
select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background-color: #f9f9f9;
  transition: border 0.2s ease;
}

input:focus,
select:focus {
  border-color: #28a745;
  outline: none;
  background-color: #fff;
  box-shadow: 0 0 6px rgba(40, 167, 69, 0.3);
}

.btn-submit {
  width: 20%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #218838;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
}

.btn-back:hover {
  background-color: #0069d9;
}
</style>
