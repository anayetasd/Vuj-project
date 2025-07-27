<template>
  <div class="form-container" v-if="stockLoaded">
    <router-link to="/stocks" class="btn btn-success btn-back">← Back</router-link>
    <h3>Edit Stock Entry</h3>
    <form @submit.prevent="handleUpdate">
      <div class="mb-3">
        <label for="product_id" class="form-label">Product Name</label>
        <select
          id="product_id"
          v-model="form.product_id"
          class="form-select"
          required
        >
          <option value="">Select Product</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="qty" class="form-label">Quantity</label>
        <input
          type="number"
          id="qty"
          v-model.number="form.qty"
          class="form-control"
          required
          min="1"
        />
      </div>

      <div class="mb-3">
        <label for="transaction_type_id" class="form-label">Transaction Type</label>
        <select
          id="transaction_type_id"
          v-model="form.transaction_type_id"
          class="form-select"
          required
        >
          <option value="">Select Type</option>
          <option
            v-for="type in transactionTypes"
            :key="type.id"
            :value="type.id"
          >
            {{ type.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="created_at" class="form-label">Created At</label>
        <input
          type="datetime-local"
          id="created_at"
          v-model="form.created_at"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="warehouse_id" class="form-label">Warehouse</label>
        <select
          id="warehouse_id"
          v-model="form.warehouse_id"
          class="form-select"
          required
        >
          <option value="">Select Warehouse</option>
          <option
            v-for="wh in warehouses"
            :key="wh.id"
            :value="wh.id"
          >
            {{ wh.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary btn-submit">🔄 Update Stock</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api'

const stockLoaded = ref(false)
const stock = ref(null)

const products = ref([])
const transactionTypes = ref([])
const warehouses = ref([])

const form = ref({
  product_id: '',
  qty: null,
  transaction_type_id: '',
  created_at: '',
  warehouse_id: ''
})

const formatDatetime = (isoDate) => {
  const date = new Date(isoDate)
  const pad = (n) => (n < 10 ? '0' + n : n)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const fetchStock = async () => {
  try {
    const res = await fetch(`${baseUrl}/stocks/${id}`)
    if (!res.ok) throw new Error('Failed to load stock')
    const data = await res.json()
    // stock can be in different places (data.stock, data.data, or data)
    const s = data.stock ?? data.data ?? data
    stock.value = s
    form.value = {
      product_id: s.product_id,
      qty: s.qty,
      transaction_type_id: s.transaction_type_id,
      created_at: formatDatetime(s.created_at),
      warehouse_id: s.warehouse_id
    }
    stockLoaded.value = true
  } catch (err) {
    alert('Failed to load stock data.')
    router.push('/stocks')
  }
}

const fetchProducts = async () => {
  try {
    const res = await fetch(`${baseUrl}/products`)
    const data = await res.json()
    products.value = data.products ?? []
  } catch {
    alert('Failed to load products.')
  }
}

const fetchTransactionTypes = async () => {
  try {
    const res = await fetch(`${baseUrl}/transaction_types`)
    const data = await res.json()
    transactionTypes.value = Array.isArray(data) ? data : data.transaction_types ?? []
  } catch {
    alert('Failed to load transaction types.')
  }
}

const fetchWarehouses = async () => {
  try {
    const res = await fetch(`${baseUrl}/warehouses`)
    const data = await res.json()
    warehouses.value = data.warehouses ?? []
  } catch {
    alert('Failed to load warehouses.')
  }
}

const handleUpdate = async () => {
  try {
    const res = await fetch(`${baseUrl}/stocks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    const result = await res.json()

    if (res.ok) {
      alert('✅ Stock updated successfully!')
      router.push('/stocks')
    } else {
      alert('❌ Error: ' + (result.message || 'Update failed'))
    }
  } catch {
    alert('❌ Update failed due to server error.')
  }
}

onMounted(() => {
  fetchStock()
  fetchProducts()
  fetchTransactionTypes()
  fetchWarehouses()
})
</script>

<style scoped>
.form-container {
  max-width: 1000px;
  margin: 40px auto;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0,0,0,0.05);
}

.form-container h3 {
  margin-bottom: 25px;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.form-label {
  font-weight: 500;
}

.btn-submit {
  width: 100%;
}
</style>
