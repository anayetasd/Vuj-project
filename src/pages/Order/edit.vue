<template>
  <div class="form-container" v-if="form">
    <router-link class="btn-back" to="/orders">← Back</router-link>

    <h2>Edit Order #{{ form.id }}</h2>

    <form @submit.prevent="handleUpdate">
      <label for="customer_id">Customer</label>
      <select v-model="form.customer_id" id="customer_id" required>
        <option v-for="customer in customers" :key="customer.id" :value="customer.id">
          {{ customer.name }}
        </option>
      </select>

      <label for="order_total">Order Total</label>
      <input type="text" v-model="form.order_total" id="order_total" required />

      <label for="discount">Discount</label>
      <input type="text" v-model="form.discount" id="discount" />

      <label for="paid_amount">Paid Amount</label>
      <input type="text" v-model="form.paid_amount" id="paid_amount" required />

      <label for="shipping_address">Address</label>
      <textarea v-model="form.shipping_address" id="shipping_address" rows="4" required></textarea>

      <input type="submit" value="Update" />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId = route.params.id

const form = ref(null)
const customers = ref([])

const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`

const fetchOrder = async () => {
  const res = await fetch(`${baseUrl}orders/${orderId}`)
  const data = await res.json()
  form.value = data.orders ?? data
}

const fetchCustomers = async () => {
  const res = await fetch(`${baseUrl}customers`)
  const data = await res.json()
  customers.value = data.customers ?? data
}

const handleUpdate = async () => {
  try {
    const res = await fetch(`${baseUrl}orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(form.value),
    })

    if (res.ok) {
      alert('✅ Order updated successfully!')
      router.push('/orders')
    } else {
      const err = await res.json()
      alert('❌ Failed: ' + (err.message || 'Something went wrong'))
    }
  } catch (err) {
    console.error('Update error:', err)
    alert('❌ Server error during update.')
  }
}

onMounted(() => {
  fetchOrder()
  fetchCustomers()
})
</script>

<style scoped>
.form-container {
  max-width: 1000px;
  margin: 40px auto;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.form-container h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #005792;
}
label {
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  color: #333;
}
select, input[type="text"], textarea {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
  box-sizing: border-box;
  resize: vertical;
}
input[type="submit"] {
  background-color: #005792;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}
input[type="submit"]:hover {
  background-color: #003f66;
}
.btn-back {
  display: inline-block;
  margin: 20px auto 0 auto;
  padding: 10px 20px;
  background-color: #198754;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.btn-back:hover {
  background-color: #145c32;
}
</style>
