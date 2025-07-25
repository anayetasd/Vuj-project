<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = route.params.id
const order = ref(null)

const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/orders/'

onMounted(async () => {
  try {
    const res = await fetch(`${baseUrl}${orderId}`)
    const data = await res.json()
    console.log('Fetched order:', data.order) 
    order.value = data.order
  } catch (error) {
    console.error('Error fetching order:', error)
  }
})

// Helper function to get product name safely
const getProductName = (item) => {
  return item.product?.name || item.product_name || 'N/A'
}

const printInvoice = () => {
  const content = document.getElementById('printInvoice').innerHTML
  const original = document.body.innerHTML
  document.body.innerHTML = content
  window.print()
  document.body.innerHTML = original
  location.reload()
}
</script>

<template>
  <div class="invoice-container" id="printInvoice" v-if="order">
    <router-link class="btn-back" to="/orders">← Back to Orders</router-link>
    <a class="btn-print" href="#" @click.prevent="printInvoice">🖨 Print Invoice</a>

    <h2>Sales Invoice</h2>

    <table class="invoice-info">
      <tbody>
        <tr><td><strong>Invoice ID:</strong></td><td>{{ order.id }}</td></tr>
        <tr><td><strong>Order Date:</strong></td><td>{{ new Date(order.order_date).toLocaleDateString() }}</td></tr>
        <tr><td><strong>Shipping Address:</strong></td><td>{{ order.shipping_address }}</td></tr>
      </tbody>
    </table>

    <table class="customer-info" v-if="order.customer">
      <tbody>
        <tr><td><strong>Customer Name:</strong></td><td>{{ order.customer.name }}</td></tr>
        <tr><td><strong>Mobile:</strong></td><td>{{ order.customer.mobile }}</td></tr>
        <tr><td><strong>Email:</strong></td><td>{{ order.customer.email }}</td></tr>
      </tbody>
    </table>

    <table class="product-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Discount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in order.order_details" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ getProductName(item) }}</td>
          <td>{{ item.qty }}</td>
          <td>৳{{ item.price.toFixed(2) }}</td>
          <td>৳{{ item.discount.toFixed(2) }}</td>
          <td>৳{{ (item.qty * item.price - item.discount).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="summary">
      <p><strong>Subtotal:</strong> ৳{{ order.order_details.reduce((sum, d) => sum + (d.qty * d.price), 0).toFixed(2) }}</p>
      <p><strong>Discount:</strong> ৳{{ order.order_details.reduce((sum, d) => sum + d.discount, 0).toFixed(2) }}</p>
      <p><strong>Paid:</strong> ৳{{ order.paid_amount.toFixed(2) }}</p>
      <p><strong>Due:</strong> ৳{{ (
        (order.order_details?.reduce((sum, d) => sum + (d.qty * d.price - d.discount), 0) || 0)
        - (order.paid_amount || 0)
      ).toFixed(2) }}</p>
    </div>

    <div style="text-align: right; margin-top: 20px;">
      <router-link class="btn btn-success" to="/mrs/create">🧾 Money Receipt</router-link>
    </div>
  </div>
</template>

<style scoped>
.invoice-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', sans-serif;
}

.invoice-container h2 {
  text-align: center;
  color: #007bff;
  margin-bottom: 25px;
}

.invoice-info {
  float: right;
  text-align: left;
  margin-bottom: 25px;
}

.invoice-info td, .customer-info td {
  padding: 8px 10px;
  font-size: 15px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.product-table th, .product-table td {
  border: 1px solid #dee2e6;
  padding: 10px;
  text-align: center;
}

.product-table th {
  background-color: #0d6efd;
  color: white;
  font-size: 14px;
}

.summary {
  text-align: right;
  font-size: 15px;
  margin-top: 15px;
}

.summary p {
  margin: 4px 0;
}

.btn-back, .btn-print {
  display: inline-block;
  margin-bottom: 20px;
  background-color: #28a745;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
}

.btn-print {
  background-color: #007bff;
  float: right;
}

.btn-print:hover {
  background-color: #0056b3;
}

.btn-back:hover {
  background-color: #218838;
}

@media print {
  .btn-back, .btn-print {
    display: none !important;
  }
}
</style>
