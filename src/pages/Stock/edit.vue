<template>
  <div class="form-container" v-if="stock">
    <router-link class="btn btn-success btn-back" to="/stocks">← Back</router-link>

    <h3>Edit Stock Entry</h3>

    <form @submit.prevent="handleUpdate">
      <div class="mb-3">
        <label for="product_id" class="form-label">Product Name</label>
        <select v-model="form.product_id" id="product_id" class="form-select" required>
          <option v-for="product in products" :value="product.id" :key="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="qty" class="form-label">Quantity</label>
        <input type="number" v-model="form.qty" id="qty" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="transaction_type_id" class="form-label">Transaction Type</label>
        <select v-model="form.transaction_type_id" id="transaction_type_id" class="form-select" required>
          <option v-for="type in transactionTypes" :value="type.id" :key="type.id">
            {{ type.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="created_at" class="form-label">Created At</label>
        <input type="datetime-local" v-model="form.created_at" id="created_at" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="warehouse_id" class="form-label">Warehouse</label>
        <select v-model="form.warehouse_id" id="warehouse_id" class="form-select" required>
          <option v-for="warehouse in warehouses" :value="warehouse.id" :key="warehouse.id">
            {{ warehouse.name }}
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
const stockId = route.params.id

const stock = ref(null)
const form = ref({
  product_id: '',
  qty: '',
  transaction_type_id: '',
  created_at: '',
  warehouse_id: '',
})

const products = ref([])
const transactionTypes = ref([])
const warehouses = ref([])

const fetchStock = async () => {
  const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${stockId}`)
  const data = await res.json()

 
  const s = data.stock ?? data.data ?? data

  stock.value = s

  form.value = {
    product_id: s.product_id,
    qty: s.qty,
    transaction_type_id: s.transaction_type_id,
    created_at: formatDatetime(s.created_at),
    warehouse_id: s.warehouse_id
  }
}

const fetchOptions = async () => {
  const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/options`)
  const data = await res.json()
  products.value = data.products || []
  transactionTypes.value = data.transaction_types || []
  warehouses.value = data.warehouses || []
}

const handleUpdate = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/stocks/${stockId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    const result = await res.json()

    if (res.ok) {
      alert('✅ Stock updated successfully!')
      router.push('/stocks')
    } else {
      alert('❌ Error: ' + (result.message || 'Update failed'))
    }
  } catch (err) {
    console.error(err)
    alert('❌ Update failed due to server error.')
  }
}

const formatDatetime = (isoDate) => {
  const date = new Date(isoDate)
  const pad = (n) => (n < 10 ? '0' + n : n)

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

onMounted(() => {
  fetchStock()
  fetchOptions()
})
</script>


<style scoped>
.form-container {
  max-width: 1000px;
  margin: 40px auto;
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
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
.btn-back {
  margin-bottom: 20px;
}
</style>
