<script setup>
import { ref, onMounted } from 'vue'

const suppliers = ref([])
const warehouses = ref([])
const products = ref([])
const cart = ref([])
const subtotal = ref(0)
const netTotal = ref(0)

const form = ref({
  supplier_id: '',
  warehouse_id: '',
  purchase_date: new Date().toISOString().substr(0, 10),
  delivery_date: new Date().toISOString().substr(0, 10),
  shipping_address: '',
  remark: '',
  purchase_total: 0,
  paid_amount: 0,
  discount: 0,
  vat: 0
})

const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/'

onMounted(async () => {
  try {
    const [supplierRes, warehouseRes, productRes] = await Promise.all([
      fetch(`${baseUrl}suppliers`),
      fetch(`${baseUrl}warehouses`),
      fetch(`${baseUrl}products`)
    ])

    suppliers.value = await supplierRes.json()
    warehouses.value = await warehouseRes.json()
    products.value = await productRes.json()
  } catch (err) {
    console.error('Error loading data:', err)
  }
})

const selected = ref({
  product_id: '',
  price: '',
  qty: '',
  discount: ''
})

function addToCart() {
  const { product_id, price, qty, discount } = selected.value
  if (!product_id || price <= 0 || qty <= 0) return alert('Product info missing')

  const name = products.value.find(p => p.id == product_id)?.name || 'Unknown'

  cart.value.push({
    product_id,
    name,
    price: parseFloat(price),
    qty: parseInt(qty),
    discount: parseFloat(discount || 0),
  })

  selected.value = { product_id: '', price: '', qty: '', discount: '' }
  refreshTotals()
}

function refreshTotals() {
  let sub = 0
  cart.value.forEach(i => {
    sub += (i.price * i.qty) - i.discount
  })
  subtotal.value = netTotal.value = sub
}

function removeRow(index) {
  cart.value.splice(index, 1)
  refreshTotals()
}

function clearCart() {
  cart.value = []
  refreshTotals()
}

async function processPurchase() {
  if (!form.value.supplier_id || !form.value.warehouse_id || cart.value.length === 0) {
    alert("Fill all required fields")
    return
  }

  const payload = {
    ...form.value,
    purchase_total: netTotal.value,
    paid_amount: netTotal.value,
    items: cart.value.map(i => ({
      product_id: i.product_id,
      qty: i.qty,
      price: i.price,
      discount: i.discount,
      vat: 0
    }))
  }

  try {
    const res = await fetch(`${baseUrl}purchases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const text = await res.text()
    const json = JSON.parse(text)

    if (json.msg === 'Success') {
      alert('Purchase saved with ID: ' + json.id)
      clearCart()
    } else {
      alert('Save failed: ' + JSON.stringify(json))
    }
  } catch (err) {
    console.error(err)
    alert('API error')
  }
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Create Purchase</h2>

    <div class="row mb-3">
      <div class="col-md-4">
        <label>Warehouse</label>
        <select v-model="form.warehouse_id" class="form-control">
          <option value="">Select</option>
          <option v-for="w in warehouses" :key="w.id" :value="w.id">{{ w.name }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <label>Supplier</label>
        <select v-model="form.supplier_id" class="form-control">
          <option value="">Select</option>
          <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
        <label class="mt-2">Shipping Address</label>
        <textarea v-model="form.shipping_address" class="form-control"></textarea>
      </div>
      <div class="col-md-4">
        <label>Purchase Date</label>
        <input type="date" v-model="form.purchase_date" class="form-control" />
        <label class="mt-2">Delivery Date</label>
        <input type="date" v-model="form.delivery_date" class="form-control" />
      </div>
    </div>

    <!-- Cart Table -->
    <table class="table table-bordered mb-3">
      <thead class="table-info">
        <tr>
          <th>SN</th>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Discount</th>
          <th>Subtotal</th>
          <th><button class="btn btn-sm btn-danger" @click="clearCart">Clear</button></th>
        </tr>
        <tr>
          <td>#</td>
          <td>
            <select v-model="selected.product_id" class="form-control">
              <option value="">Choose</option>
              <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </td>
          <td><input v-model="selected.price" type="number" class="form-control" /></td>
          <td><input v-model="selected.qty" type="number" class="form-control" /></td>
          <td><input v-model="selected.discount" type="number" class="form-control" /></td>
          <td></td>
          <td><button class="btn btn-sm btn-success" @click="addToCart">+</button></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.discount }}</td>
          <td>{{ (item.qty * item.price) - item.discount }}</td>
          <td><button class="btn btn-sm btn-danger" @click="removeRow(index)">X</button></td>
        </tr>
        <tr v-if="cart.length === 0">
          <td colspan="7" class="text-center">No items in cart.</td>
        </tr>
      </tbody>
    </table>

    <!-- Totals -->
    <div class="row">
      <div class="col-md-6">
        <label>Remark</label>
        <textarea v-model="form.remark" class="form-control"></textarea>
      </div>
      <div class="col-md-6">
        <table class="table">
          <tbody>
                <tr><th>Subtotal</th><td>{{ subtotal }}</td></tr>
                <tr><th>Total</th><td>{{ netTotal }}</td></tr>
            </tbody>
        </table>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="text-end">
      <button class="btn btn-primary" @click="processPurchase">
        Process Purchase
      </button>
    </div>
  </div>
</template>

<style scoped>
textarea {
  width: 50%;
  min-height: 80px;
}
</style>
