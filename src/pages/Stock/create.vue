<template>
  <div class="container mt-5">
    <div class="form-container p-4 shadow rounded bg-white">
      <h3 class="text-center mb-4">Create New Stock Entry</h3>

      <form @submit.prevent="handleSubmit">
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
            min="1"
            required
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
              v-for="warehouse in warehouses"
              :key="warehouse.id"
              :value="warehouse.id"
            >
              {{ warehouse.name }}
            </option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary w-100">💾 Save Stock</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api'

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

// ডেটটাইমলোকাল ফরম্যাটে এখনকার সময় সেট করার ফাংশন
function getCurrentDateTimeLocal() {
  const now = new Date()
  const pad = (n) => (n < 10 ? '0' + n : n)
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`
}

const fetchProducts = async () => {
  try {
    const res = await fetch(`${baseUrl}/products`)
    const data = await res.json()
    if (data.products) products.value = data.products
    else alert('Failed to load products: Invalid response')
  } catch {
    alert('Failed to load products')
  }
}

const fetchTransactionTypes = async () => {
  try {
    const res = await fetch(`${baseUrl}/transaction_types`)
    const data = await res.json()
    if (Array.isArray(data)) transactionTypes.value = data
    else alert('Failed to load transaction types: Invalid response')
  } catch {
    alert('Failed to load transaction types')
  }
}

const fetchWarehouses = async () => {
  try {
    const res = await fetch(`${baseUrl}/warehouses`)
    const data = await res.json()
    if (data.warehouses) warehouses.value = data.warehouses
    else alert('Failed to load warehouses: Invalid response')
  } catch {
    alert('Failed to load warehouses')
  }
}

onMounted(() => {
  form.value.created_at = getCurrentDateTimeLocal()
  fetchProducts()
  fetchTransactionTypes()
  fetchWarehouses()
})

const handleSubmit = async () => {
  if (
    !form.value.product_id ||
    !form.value.qty ||
    !form.value.transaction_type_id ||
    !form.value.created_at ||
    !form.value.warehouse_id
  ) {
    alert('Please fill all required fields.')
    return
  }

  try {
    const res = await fetch(`${baseUrl}/stocks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to save stock')
    }

    alert('✅ Stock saved successfully!')
    router.push('/stocks')
  } catch (err) {
    alert('❌ ' + err.message)
  }
}
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
</style>
