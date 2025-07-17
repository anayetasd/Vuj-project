<template>
  <div class="receipt-wrapper">
    <div class="receipt-header">
      <h1>{{ company.name }}</h1>
      <p>{{ company.address }}</p>
      <h2 style="margin-top: 10px;">Money Receipt</h2>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="customer_id">Customer</label>
        <select v-model="form.customer_id">
          <option disabled value="">Select Customer</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="receipt_date">Date</label>
        <input type="date" v-model="form.receipt_date" />
      </div>

      <div class="form-group">
        <label>Receipt ID</label>
        <input type="text" :value="MR_last + 1" readonly />
      </div>

      <div class="form-group">
        <label for="shipping_address">Shipping Address</label>
        <textarea v-model="form.shipping_address" rows="2"></textarea>
      </div>

      <div class="form-group">
        <label for="remark">Remark</label>
        <textarea v-model="form.remark" rows="2"></textarea>
      </div>
    </div>

    <table class="receipt-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.discount }}</td>
          <td>{{ (item.price - item.discount).toFixed(2) }}</td>
          <td><button class="btn btn-danger btn-sm" @click="removeItem(index)">X</button></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <select v-model="newItem.product_id">
              <option disabled value="">Select Product</option>
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
              >
                {{ product.product_name }}
              </option>
            </select>
          </td>
          <td><input type="number" v-model.number="newItem.price" /></td>
          <td><input type="number" v-model.number="newItem.discount" /></td>
          <td></td>
          <td><button class="btn btn-primary" @click="addItem">+</button></td>
        </tr>
      </tfoot>
    </table>

    <div class="summary">
      Total: <span>{{ total.toFixed(2) }}</span>
    </div>

    <div class="btn-group-actions">
      <button class="btn btn-primary" @click="window.print()">🖨 Print</button>
      <button class="btn btn-success" @click="submitReceipt">Submit</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const company = ref({})
const customers = ref([])
const products = ref([])
const MR_last = ref(0)

const items = ref([])
const newItem = reactive({
  product_id: '',
  price: 0,
  discount: 0
})

const form = reactive({
  customer_id: '',
  receipt_date: new Date().toISOString().substr(0, 10),
  shipping_address: '',
  remark: '',
  receipt_total: 0,
  paid_amount: 0,
  discount: 0,
  vat: 0
})

const addItem = () => {
  const product = products.value.find(p => p.id == newItem.product_id)

  if (!product || newItem.price <= 0) {
    alert('Please enter valid product and price')
    return
  }

  items.value.push({
    product_id: newItem.product_id,
    name: product.product_name,
    price: newItem.price,
    qty: 1,
    discount: newItem.discount,
    vat: 0
  })

  newItem.product_id = ''
  newItem.price = 0
  newItem.discount = 0
}

const removeItem = index => {
  items.value.splice(index, 1)
}

const total = computed(() => {
  return items.value.reduce((sum, item) => sum + (item.price - item.discount), 0)
})

const submitReceipt = async () => {
  if (!form.customer_id || items.value.length === 0) {
    alert('Please select customer and add items')
    return
  }

  const payload = {
    ...form,
    receipt_total: total.value,
    paid_amount: total.value,
    items: items.value.map(item => ({
      product_id: item.product_id,
      price: item.price,
      qty: item.qty,
      vat: item.vat,
      discount: item.discount
    }))
  }

  try {
    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/mrs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const json = await res.json()
    if (json.message === 'Money Receipt Saved Successfully') {
      alert('Receipt saved successfully!')
      items.value = []
    } else {
      alert('Error: ' + JSON.stringify(json))
    }
  } catch (err) {
    console.error(err)
    alert('Failed to connect to server')
  }
}

onMounted(async () => {
  try {
    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/mrs/create')
    const data = await res.json()

    console.log('API Response:', data)

    company.value = data.company || {}
    customers.value = data.customers || []
    products.value = Array.isArray(data.products) ? data.products : []
    MR_last.value = data.last_id ?? 0
  } catch (error) {
    console.error('API Load Failed:', error)
    alert('Failed to load data. Using fallback data.')

    company.value = { name: 'Demo Rice Mill', address: 'Demo Address' }
    customers.value = [{ id: 1, name: 'Demo Customer' }]
    products.value = [{ id: 1, product_name: 'Demo Product' }]
    MR_last.value = 999
  }
})
</script>



<style scoped>
.receipt-wrapper {
  width: 1100px;
  margin: 40px auto;
  padding: 30px 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.receipt-header {
  text-align: center;
  border-bottom: 2px solid #198754;
  padding-bottom: 15px;
  margin-bottom: 30px;
}

.receipt-header h1 {
  font-size: 2.4rem;
  margin-bottom: 5px;
  color: #198754;
  font-weight: 700;
}

.receipt-header p {
  font-size: 1rem;
  color: #555;
  margin: 0;
}

.receipt-header h2 {
  font-weight: 600;
  color: #28a745;
  margin-top: 10px;
  letter-spacing: 1px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #444;
}

.form-group select,
.form-group input,
.form-group textarea {
  padding: 8px 12px;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

.form-group select:focus,
.form-group input:focus,
.form-group textarea:focus {
  border-color: #198754;
  outline: none;
  background-color: #fff;
}

.receipt-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 1rem;
}

.receipt-table thead tr {
  background-color: #198754;
  color: #fff;
}

.receipt-table th,
.receipt-table td {
  padding: 10px 12px;
  text-align: center;
  border: 1px solid #ddd;
}

.receipt-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.receipt-table tfoot tr td {
  border: none;
  padding-top: 15px;
}

.receipt-table tfoot select,
.receipt-table tfoot input {
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  border-radius: 6px;
  border: 1.5px solid #ccc;
  padding: 6px 8px;
  transition: border-color 0.3s ease;
}

.receipt-table tfoot select:focus,
.receipt-table tfoot input:focus {
  border-color: #198754;
  outline: none;
}

.btn {
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 1rem;
  border: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  user-select: none;
}

.btn-primary {
  background-color: #198754;
  color: white;
}

.btn-primary:hover {
  background-color: #145c32;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #a71d2a;
}

.btn-group-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 15px;
}

.summary {
  text-align: right;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #198754;
}

/* Responsive */
@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .btn-group-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-group-actions .btn {
    width: 100%;
  }
}
</style>
