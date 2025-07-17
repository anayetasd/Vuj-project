<template>
  <div class="invoice-container" id="printMR">
    <router-link class="btn-back" to="/mrs">← Back to Receipts</router-link>
    <a class="btn-print" href="#" @click.prevent="printInvoice">🖨 Print Invoice</a>

    <div class="invoice-header">Money Receipt</div>

    <div class="info-section" v-if="mr && mr.customer">
      <table class="customer-info">
        <tbody>
          <tr><td><strong>Customer Name:</strong></td><td>{{ mr.customer.name }}</td></tr>
          <tr><td><strong>Mobile:</strong></td><td>{{ mr.customer.mobile }}</td></tr>
          <tr><td><strong>Email:</strong></td><td>{{ mr.customer.email }}</td></tr>
        </tbody>
      </table>

      <table class="mr-info">
        <tbody>
          <tr><td><strong>Receipt ID:</strong></td><td>{{ mr.id }}</td></tr>
          <tr><td><strong>Date:</strong></td><td>{{ formatDate(mr.mr_date) }}</td></tr>
          <tr><td><strong>Shipping Address:</strong></td><td>{{ mr.shipping_address }}</td></tr>
        </tbody>
      </table>
    </div>

    <table class="product-table" v-if="mr && mr.mr_details">
      <thead>
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in mr.mr_details" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ mr.customer?.name || 'N/A' }}</td>
          <td>{{ item.qty }}</td>
          <td>৳{{ formatNumber(item.price) }}</td>
          <td>৳{{ formatNumber(item.qty * item.price) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="summary" v-if="mr">
      <p><strong>Subtotal:</strong> ৳{{ formatNumber(subtotal) }}</p>
      <p><strong>Discount:</strong> ৳{{ formatNumber(mr.discount || 0) }}</p>
      <p><strong>Paid:</strong> ৳{{ formatNumber(mr.paid_amount || 0) }}</p>
      <p><strong>Due:</strong> ৳{{ formatNumber((subtotal - (mr.discount || 0)) - (mr.paid_amount || 0)) }}</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const mr = ref()
const subtotal = ref(0)

const fetchMR = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/mrs/${id}`, {
      headers: {
        Accept: 'application/json'
      }
    })
    const data = await res.json()
    console.log('👉 API MR response:', data)

    mr.value = data.mr ?? data

    // Default customer if missing
    if (!mr.value.customer) {
      mr.value.customer = { name: 'N/A', email: 'N/A', mobile: 'N/A' }
    }

    // Default details if missing
    if (!Array.isArray(mr.value.mr_details)) {
      mr.value.mr_details = []
    }

    calculateSubtotal()
  } catch (err) {
    console.error('❌ Failed to fetch MR:', err)
  }
}

const calculateSubtotal = () => {
  if (mr.value?.mr_details) {
    subtotal.value = mr.value.mr_details.reduce((acc, item) => {
      const qty = parseFloat(item.qty || 0)
      const price = parseFloat(item.price || 0)
      return acc + qty * price
    }, 0)
  }
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  })
}

const formatNumber = (num) => parseFloat(num).toFixed(2)

const printInvoice = () => {
  const printContents = document.getElementById('printMR').innerHTML
  const printWindow = window.open('', '', 'height=600,width=900')
  printWindow.document.write('<html><head><title>Print Invoice</title>')
  printWindow.document.write('</head><body>')
  printWindow.document.write(printContents)
  printWindow.document.write('</body></html>')
  printWindow.document.close()
  printWindow.print()
}

onMounted(fetchMR)
</script>


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

.invoice-header {
  text-align: center;
  color: #007bff;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
}

.info-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.mr-info, .customer-info {
  width: 48%;
}

.mr-info td, .customer-info td {
  padding: 6px 10px;
  font-size: 15px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
  margin-top: 20px;
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
