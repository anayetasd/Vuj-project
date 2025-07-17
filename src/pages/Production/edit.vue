<template>
  <div>
    <router-link class="btn btn-success" to="/productions">← Back</router-link>

    <div class="form-container">
      <h2>Edit Production</h2>

      <form @submit.prevent="updateProduction">
        <div class="form-group">
          <label for="production_date">Production Date</label>
          <input v-model="form.production_date" type="text" id="production_date" />
        </div>

        <div class="form-group">
          <label for="product_id">Product Name</label>
          <select v-model="form.product_id" id="product_id">
            <option v-for="product in products" :key="product.id" :value="product.id">
              {{ product.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="raw_material_id">Raw Material Used</label>
          <select v-model="form.raw_material_id" id="raw_material_id">
            <option v-for="raw in rawmaterials" :key="raw.id" :value="raw.id">
              {{ raw.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="raw_material_qty">Raw Material Qty</label>
          <select v-model="form.raw_material_qty" id="raw_material_qty">
            <option v-for="raw in rawmaterials" :key="raw.id" :value="raw.id">
              {{ raw.unit }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="unit">Wastage Unit</label>
          <input v-model="form.unit" type="text" id="unit" />
        </div>

        <div class="form-group">
          <label for="quantity_produced">Total Produced</label>
          <input v-model="form.quantity_produced" type="text" id="quantity_produced" />
        </div>

        <div class="form-submit">
          <input type="submit" value="Update" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api'

const form = ref({
  production_date: '',
  product_id: '',
  raw_material_id: '',
  raw_material_qty: '',
  unit: '',
  quantity_produced: ''
})

const products = ref([])
const rawmaterials = ref([])

onMounted(() => {
  fetchData()
})

async function fetchData() {
  try {
    const [prodRes, metaRes] = await Promise.all([
      fetch(`${baseUrl}/productions/${id}`),
      fetch(`${baseUrl}/productions/create`)
    ])

    const prodData = await prodRes.json()
    const metaData = await metaRes.json()

    form.value = {
      production_date: prodData.production.production_date,
      product_id: prodData.production.product_id,
      raw_material_id: prodData.production.raw_material_id,
      raw_material_qty: prodData.production.raw_material_id, // assuming same as raw_material_id
      unit: prodData.production.unit,
      quantity_produced: prodData.production.quantity_produced
    }

    products.value = metaData.products
    rawmaterials.value = metaData.rawmaterials
  } catch (error) {
    console.error('Fetch Error:', error)
  }
}

async function updateProduction() {
  try {
    const res = await fetch(`${baseUrl}/productions/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json'
      },
      body: buildFormData(form.value)
    })

    if (res.ok) {
      alert('Production updated successfully')
      router.push('/productions')
    } else {
      const data = await res.json()
      alert('Update failed: ' + (data.message || 'Error occurred'))
    }
  } catch (error) {
    console.error('Update Error:', error)
  }
}

function buildFormData(data) {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
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
  background-color: #007bff;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-submit input[type='submit']:hover {
  background-color: #0056b3;
}

.btn-success {
  margin: 20px;
}
</style>
