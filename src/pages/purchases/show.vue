<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const purchase = ref({})
const details = ref([])
const supplier = ref({})
const subtotal = ref(0)

const fetchInvoice = async () => {
  try {
    const response = await fetch(`http://anayet.intelsofts.com/project_app/public/api/purchases/${route.params.id}`, {
      headers: { Accept: 'application/json' }
    })

    const data = await response.json()
    console.log('API Response:', data)

    const found = data.purchase ?? {} 

    purchase.value = found
    supplier.value = found.supplier ?? {}
    details.value = found.details ?? []

    subtotal.value = details.value.reduce((sum, item) => {
      const qty = parseFloat(item.qty || 0)
      const price = parseFloat(item.price || 0)
      const discount = parseFloat(item.discount || 0)
      return sum + (qty * price - discount)
    }, 0)
  } catch (err) {
    console.error('Error fetching invoice:', err)
  }
}



const formatNumber = (num) => parseFloat(num || 0).toFixed(2)

const printInvoice = () => {
  const printContents = document.getElementById('printInvoice').innerHTML
  const printWindow = window.open('', '', 'height=600,width=900')
  printWindow.document.write('<html><head><title>Print Invoice</title>')
  printWindow.document.write('</head><body>')
  printWindow.document.write(printContents)
  printWindow.document.write('</body></html>')
  printWindow.document.close()
  printWindow.print()
}

onMounted(fetchInvoice)
</script>


<template>
  <div class="invoice-container" id="printInvoice">
    <router-link class="btn-back" to="/purchases">← Back to Purchases</router-link>
    <a class="btn-print" href="#" @click.prevent="printInvoice">🖨 Print Invoice</a>

    <h2>Purchase Invoice</h2>

    <table class="invoice-info">
      <tbody>
        <tr><td><strong>Invoice ID:</strong></td><td>{{ purchase.id || 'N/A' }}</td></tr>
        <tr>
          <td><strong>Purchase Date:</strong></td>
          <td>{{ purchase.purchase_date ? new Date(purchase.purchase_date).toLocaleDateString() : 'N/A' }}</td>
        </tr>
        <tr><td><strong>Shipping Address:</strong></td><td>{{ purchase.shipping_address || 'N/A' }}</td></tr>
      </tbody>
    </table>

    <table class="supplier-info" v-if="supplier">
      <tbody>
        <tr><td><strong>Supplier Name:</strong></td><td>{{ supplier.name || 'N/A' }}</td></tr>
        <tr><td><strong>Mobile:</strong></td><td>{{ supplier.mobile || 'N/A' }}</td></tr>
        <tr><td><strong>Email:</strong></td><td>{{ supplier.email || 'N/A' }}</td></tr>
      </tbody>
    </table>

    <table class="product-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in details" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.product?.name || item.product_name || 'No Product' }}</td>
          <td>{{ item.qty }}</td>
          <td>৳{{ formatNumber(item.price) }}</td>
          <td>৳{{ formatNumber(item.qty * item.price) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="summary">
      <p><strong>Subtotal:</strong> ৳{{ formatNumber(subtotal) }}</p>
      <p><strong>Discount:</strong> ৳{{ formatNumber(purchase.discount) }}</p>
      <p><strong>Paid:</strong> ৳{{ formatNumber(purchase.paid_amount) }}</p>
      <p><strong>Due:</strong> ৳{{ formatNumber(subtotal - (purchase.discount || 0) - (purchase.paid_amount || 0)) }}</p>
    </div>

    <div style="text-align: right; margin-top: 20px;">
      <router-link class="btn btn-success" to="/mrs/create">🧾 Money Receipt</router-link>
    </div>
  </div>
</template>


<style scoped>
.invoice-container {
  max-width: 1200px;
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
.invoice-info td, .supplier-info td {
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
