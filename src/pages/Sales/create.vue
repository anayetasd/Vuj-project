<template>
  <div class="create-container">
    <h2 class="form-title">Create New Sale</h2>

    <form @submit.prevent="handleSubmit">
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
        <label for="total_amount">Total Amount</label>
        <input
          v-model="form.total_amount"
          type="number"
          step="0.01"
          id="total_amount"
          name="total_amount"
          required
          placeholder="Enter total amount"
        />
      </div>

      <div class="form-group">
        <label for="discount">Discount</label>
        <input
          v-model="form.discount"
          type="number"
          step="0.01"
          id="discount"
          name="discount"
          placeholder="Enter discount (optional)"
        />
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <input
          v-model="form.status"
          type="text"
          id="status"
          name="status"
          placeholder="Enter status (optional)"
        />
      </div>

      <div class="form-group">
        <label for="created_at">Created At</label>
        <input
          v-model="form.created_at"
          type="datetime-local"
          id="created_at"
          name="created_at"
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const customers = ref([])

const form = ref({
  customer_id: '',
  total_amount: '',
  discount: '',
  status: '',
  created_at: '',
})

// Fetch customer list
const fetchCustomers = async () => {
  try {
    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/customers')
    if (!res.ok) throw new Error('Failed to fetch customers')
    const data = await res.json()
    customers.value = data.customers
  } catch (err) {
    alert('❌ ' + err.message)
  }
}

// Set default date-time
const pad = (n) => (n < 10 ? '0' + n : n)
onMounted(() => {
  fetchCustomers()
  const now = new Date()
  form.value.created_at = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}T${pad(now.getHours())}:${pad(now.getMinutes())}`
})

// Handle submit
const handleSubmit = async () => {
  try {
    if (!form.value.customer_id || !form.value.total_amount) {
      alert('Please fill in all required fields.')
      return
    }

    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/sales', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value),
    })

    const contentType = res.headers.get('content-type')
    if (!res.ok) {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to save sale')
      } else {
        throw new Error('Unexpected server error. Please check backend.')
      }
    }

    alert('✅ Sale saved successfully!')
    router.push('/sales')
  } catch (error) {
    alert('❌ ' + error.message)
  }
}
</script>

<style scoped>
body {
  background-color: #f4f6f8;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.create-container {
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

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
}

.form-group input[type='text'],
.form-group input[type='number'],
.form-group input[type='datetime-local'],
.form-group select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 15px;
  background-color: #fafafa;
  box-sizing: border-box;
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
}

.btn-submit:hover {
  background-color: #0056b3;
  cursor: pointer;
}
</style>
