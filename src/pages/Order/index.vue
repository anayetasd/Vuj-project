<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])
const customers = ref([])

const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`

onMounted(async () => {
  try {
    // Fetch Orders
    const resOrders = await fetch(`${baseUrl}orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const ordersData = await resOrders.json()
    orders.value = ordersData.orders

    // Fetch Customers
    const resCustomers = await fetch(`${baseUrl}customers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const customersData = await resCustomers.json()
    customers.value = customersData.customers

  } catch (err) {
    console.error('Fetch Error:', err)
    throw err
  }
})

// Helper to get customer name from customer_id
const getCustomerName = (id) => {
  const customer = customers.value.find(c => c.id === id)
  return customer ? customer.name : 'Unknown'
}
</script>

<template>
  <div class="order-container">
    <h1>Manage Orders</h1>
    <router-link class="btn-create" to="/orders/create">+ New Order</router-link>

    <table class="order-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Total</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ getCustomerName(order.customer_id) }}</td>
          <td>{{ order.order_total }}</td>
          <td>{{ order.shipping_address }}</td>
          <td class="btn-group">
            <router-link class="btn btn-view" :to="`/orders/${order.id}`">View</router-link>
            <router-link class="btn btn-edit" :to="`/orders/${order.id}/edit`">Edit</router-link>
            <router-link class="btn btn-delete" :to="`/orders/delete/${order.id}`">Delete</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.order-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 25px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  color: #0d6efd;
  text-align: center;
  margin-bottom: 25px;
}

.btn-create {
  display: inline-block;
  margin-bottom: 20px;
  background-color: #198754;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: 0.3s;
}

.btn-create:hover {
  background-color: #157347;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.order-table th,
.order-table td {
  padding: 14px 18px;
  border: 1px solid #dee2e6;
  text-align: left;
  font-size: 15px;
}

.order-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.btn-group {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 6px 12px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  color: white;
  transition: 0.2s ease-in-out;
}

.btn-view {
  background-color: #0d6efd;
}
.btn-view:hover {
  background-color: #0b5ed7;
}

.btn-edit {
  background-color: #ffc107;
  color: black;
}
.btn-edit:hover {
  background-color: #e0a800;
}

.btn-delete {
  background-color: #dc3545;
}
.btn-delete:hover {
  background-color: #bb2d3b;
}
</style>
