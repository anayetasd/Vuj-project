<template>
  <div class="form-container">
    <h3>Create New Stock Entry</h3>

    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="product_id" class="form-label">Product Name</label>
        <select v-model="form.product_id" id="product_id" class="form-select" required>
          <option disabled value="">Select Products</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="qty" class="form-label">Quantity</label>
        <input type="number" v-model.number="form.qty" id="qty" class="form-control" required min="1" />
      </div>

      <div class="mb-3">
        <label for="transaction_type_id" class="form-label">Transaction Type</label>
        <select v-model="form.transaction_type_id" id="transaction_type_id" class="form-select" required>
          <option disabled value="">Select Transaction Type</option>
          <option v-for="t in transaction_types" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="created_at" class="form-label">Created At</label>
        <input
          type="datetime-local"
          v-model="form.created_at"
          id="created_at"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label for="warehouse_id" class="form-label">Warehouse</label>
        <select v-model="form.warehouse_id" id="warehouse_id" class="form-select" required>
          <option disabled value="">Select Warehouse</option>
          <option v-for="w in warehouses" :key="w.id" :value="w.id">
            {{ w.name }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary btn-submit"> Save Stock</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const products = ref([])
const transaction_types = ref([])
const warehouses = ref([])

const form = ref({
  product_id: '',
  qty: null,
  transaction_type_id: '',
  created_at: '',
  warehouse_id: '',
})

// Fetch dropdown data on mount
const fetchDropdownData = async () => {
  try {
    // Adjust these URLs to your API endpoints
    const [productsRes, transactionTypesRes, warehousesRes] = await Promise.all([
      fetch('http://anayet.intelsofts.com/project_app/public/api/products'),
      fetch('http://anayet.intelsofts.com/project_app/public/api/transaction-types'),
      fetch('http://anayet.intelsofts.com/project_app/public/api/warehouses'),
    ])

    if (!productsRes.ok || !transactionTypesRes.ok || !warehousesRes.ok) {
      throw new Error('Failed to fetch dropdown data')
    }

    products.value = await productsRes.json()
    transaction_types.value = await transactionTypesRes.json()
    warehouses.value = await warehousesRes.json()
  } catch (error) {
    alert('Error loading data: ' + error.message)
  }
}

// Handle form submission
const handleSubmit = async () => {
  try {
    // Validation could be added here if needed

    // POST form data to your API
    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) {
      const errData = await res.json()
      throw new Error(errData.message || 'Failed to save stock')
    }

    alert('✅ Stock saved successfully!')
    router.push('/stocks')
  } catch (error) {
    alert('❌ ' + error.message)
  }
}

// Initialize datetime-local to current datetime in correct format on mount
const pad = (num) => (num < 10 ? '0' + num : num)
onMounted(() => {
  fetchDropdownData()

  const now = new Date()
  form.value.created_at = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
    now.getDate()
  )}T${pad(now.getHours())}:${pad(now.getMinutes())}`
})
</script>

<style scoped>
.form-container {
  max-width: 1000px;
  margin: 40px auto;
  background: #ffffff;
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
  width: 20%;
}
</style>
