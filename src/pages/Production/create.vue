<template>
  <div class="form-container">
    <h2>Create New Production</h2>

    <form @submit.prevent="submitProduction">
      <div class="form-group">
        <label for="production_date">Production Date</label>
        <input type="date" v-model="production.production_date" id="production_date" />
      </div>

      <div class="form-group">
        <label for="product_id">Product Name</label>
        <select v-model="production.product_id" id="product_id">
          <option disabled value="">Select a product</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="raw_material_id">Raw Material Used</label>
        <select v-model="production.raw_material_id" id="raw_material_id">
          <option disabled value="">Select raw material</option>
          <option v-for="material in rawmaterials" :key="material.id" :value="material.id">
            {{ material.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="raw_material_qty">Raw Material Qty</label>
        <input type="number" v-model="production.raw_material_qty" id="raw_material_qty" />
      </div>

      <div class="form-group">
        <label for="unit">Wastage Unit</label>
        <input type="text" v-model="production.unit" id="unit" />
      </div>

      <div class="form-group">
        <label for="quantity_produced">Total Produced</label>
        <input type="number" v-model="production.quantity_produced" id="quantity_produced" />
      </div>

      <div class="form-submit">
        <input type="submit" value="Save" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api/'

const production = ref({
  production_date: '',
  product_id: '',
  raw_material_id: '',
  raw_material_qty: '',
  unit: '',
  quantity_produced: ''
})

const products = ref([])
const rawmaterials = ref([])

const fetchOptions = {
  headers: {
    'Accept': 'application/json',
  }
}

onMounted(async () => {
  try {
    const res1 = await fetch(`${baseUrl}products`, fetchOptions)
    const res2 = await fetch(`${baseUrl}rawmaterials`, fetchOptions)

    const data1 = await res1.json()
    const data2 = await res2.json()

    products.value = data1.products || []
    rawmaterials.value = data2.rawmaterials || []
  } catch (err) {
    console.error('Data fetch failed:', err)
  }
})

const submitProduction = async () => {
  try {
    const res = await fetch(`${baseUrl}productions`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: createFormData()
    })

    const result = await res.json()

    if (res.ok) {
      alert('Production Created!')
      router.push('/productions')
    } else {
      alert('Failed to save: ' + result.message)
    }
  } catch (err) {
    console.error('Save error:', err)
    alert('Save failed.')
  }
}

const createFormData = () => {
  const formData = new FormData()
  Object.entries(production.value).forEach(([key, val]) => formData.append(key, val))
  return formData
}
</script>

<style scoped>
.form-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  margin-bottom: 25px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #555;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #007bff;
  outline: none;
}

.form-submit {
  text-align: center;
}

.form-submit input[type='submit'] {
  background-color: #28a745;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-submit input[type='submit']:hover {
  background-color: #218838;
}
</style>
