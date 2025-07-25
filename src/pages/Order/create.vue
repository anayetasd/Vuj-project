<script setup>
import { ref, onMounted, computed, toRaw } from 'vue'

const baseUrl = `http://anayet.intelsofts.com/project_app/public/api/`
const endpoint = `orders`
const endpoint2 = `customers`
const endpoint3 = `products`

const customer_id = ref('')
const order_date = ref('')
const shipping_address = ref('')
const remark = ref('')
const order_total = ref(0)

const customers = ref([])
const products = ref([])

const items = ref([])
const newItem = ref({ id: '', name: '', qty: 1, price: 0, vat: 0, discount: 0 })

const selectedText = computed(() => {
  const selected = products.value.find(p => p.id === newItem.value.id)
  return selected ? selected.name : ''
})

onMounted(async () => {
  try {
    const [res1, res2] = await Promise.all([
      fetch(`${baseUrl}${endpoint2}`),
      fetch(`${baseUrl}${endpoint3}`)
    ])

    let r1 = await res1.json()
    let r2 = await res2.json()

    customers.value = r1.customers ?? r1
    products.value = r2.products ?? r2
  } catch (err) {
    console.error('Fetch Error:', err)
  }
})

const addItem = () => {
  const product = products.value.find(p => p.id === newItem.value.id)
  if (!product) {
    alert(" Product select করুন")
    return
  }

  items.value.push({
    product_id: newItem.value.id,
    name: product.name,
    qty: parseFloat(newItem.value.qty),
    price: parseFloat(newItem.value.price),
    vat: parseFloat(newItem.value.vat) || 0,
    discount: parseFloat(newItem.value.discount) || 0
  })

  newItem.value = { id: '', name: '', qty: 1, price: 0, vat: 0, discount: 0 }

  calculateTotal()
}

const calculateTotal = () => {
  order_total.value = items.value.reduce((acc, item) => {
    const subtotal = item.qty * item.price
    const vatAmount = (subtotal * item.vat) / 100
    const discountAmount = (subtotal * item.discount) / 100
    return acc + subtotal + vatAmount - discountAmount
  }, 0)
}

const submitOrder = async () => {
  if (!customer_id.value) {
    alert(' Select customer')
    return
  }

  if (!order_date.value || items.value.length === 0) {
    alert(' Select date and Minimum one product')
    return
  }

  const payload = {
    customer_id: parseInt(customer_id.value),
    order_date: order_date.value,
    delivery_date: order_date.value,
    shipping_address: shipping_address.value,
    order_total: order_total.value,
    paid_amount: order_total.value,
    remark: remark.value || 'N/A',
    items: toRaw(items.value)
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const res = await response.json()

    if (response.ok) {
      alert('✅ Order Saved Successfully (ID: ' + res.id + ')')
      items.value = []
      order_total.value = 0
    } else {
      alert(' Save failed: ' + (res.message || 'Unknown error'))
    }
  } catch (error) {
    alert(' Error: ' + error.message)
  }
}
</script>

<template>
  <div class="order-container">
    <div class="order-header">
      <h2>Create Order</h2>
    </div>

    <div class="order-info">
      <table>
        <tbody>
          <tr>
            <td>Customer Name</td>
            <td>
              <select v-model="customer_id">
                <option value="">Select Customer</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                  {{ customer.name }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Order Date</td>
            <td><input v-model="order_date" type="date" /></td>
          </tr>
          <tr>
            <td>Shipping Address</td>
            <td><textarea v-model="shipping_address"></textarea></td>
          </tr>
        </tbody>
      </table>
    </div>

    <table class="order-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>VAT %</th>
          <th>Discount %</th>
          <th>Add</th>
        </tr>
        <tr>
          <td>
            <select v-model="newItem.id">
              <option value="">Select Product</option>
              <option v-for="product in products" :key="product.id" :value="product.id">
                {{ product.name }}
              </option>
            </select>
          </td>
          <td><input type="number" v-model="newItem.qty" /></td>
          <td><input type="number" v-model="newItem.price" /></td>
          <td><input type="number" v-model="newItem.vat" /></td>
          <td><input type="number" v-model="newItem.discount" /></td>
          <td><button @click="addItem">Add</button></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.vat }}%</td>
          <td>{{ item.discount }}%</td>
          <td>{{ (item.qty * item.price).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="order-total">
      Total Amount: <input type="text" v-model="order_total" readonly />
    </div>

    <div>
      <button class="btn btn-primary" @click="submitOrder">Create Order</button>
    </div>
  </div>
</template>

<style scoped>
.order-container {
  background-color: #fff;
  width: 100%;
  margin: auto;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.order-info {
  margin-bottom: 20px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.order-table th,
.order-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.order-table th {
  background-color: #f8f8f8;
}

.order-total {
  text-align: right;
  font-weight: bold;
  font-size: 1.1em;
  margin-top: 15px;
}

td {
  padding-bottom: 10px;
}

</style>
