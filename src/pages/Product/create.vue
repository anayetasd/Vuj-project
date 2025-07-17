<template>
  <div class="container">
    <div class="form-container">
      <h2>Create New Product</h2>
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="mb-3">
          <label for="name" class="form-label">Product Name</label>
          <input v-model="form.name" type="text" id="name" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="photo" class="form-label">Product Photo</label>
          <input @change="handleFileChange" type="file" id="photo" class="form-control" accept="image/*" required />
        </div>

        <div class="mb-3">
          <label for="regular_price" class="form-label">Regular Price</label>
          <input v-model="form.regular_price" type="number" step="0.01" id="regular_price" class="form-control" required />
        </div>

        <div class="mb-3">
          <label for="offer_price" class="form-label">Offer Price</label>
          <input v-model="form.offer_price" type="number" step="0.01" id="offer_price" class="form-control" />
        </div>

        <div class="mb-3">
          <label for="barcode" class="form-label">Barcode</label>
          <input v-model="form.barcode" type="text" id="barcode" class="form-control" />
        </div>

        <div class="mb-3">
          <label for="product_unit_id" class="form-label">Product Unit</label>
          <select v-model="form.product_unit_id" id="product_unit_id" class="form-select" required>
            <option value="">Select Unit</option>
            <option v-for="unit in units" :key="unit.id" :value="unit.id">{{ unit.name }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="product_section_id" class="form-label">Product Section</label>
          <select v-model="form.product_section_id" id="product_section_id" class="form-select" required>
            <option value="">Select Section</option>
            <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.name }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="product_category_id" class="form-label">Product Category</label>
          <select v-model="form.product_category_id" id="product_category_id" class="form-select" required>
            <option value="">Select Category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">💾 Save Product</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const baseURL = 'http://anayet.intelsofts.com/project_app/public/api'

const form = ref({
  name: '',
  photo: null,
  regular_price: '',
  offer_price: '',
  barcode: '',
  product_unit_id: '',
  product_section_id: '',
  product_category_id: ''
})

const units = ref([])
const sections = ref([])
const categories = ref([])

const fetchData = async () => {
  try {
    const [unitRes, sectionRes, categoryRes] = await Promise.all([
      fetch(`${baseURL}/product-units`),
      fetch(`${baseURL}/product-sections`),
      fetch(`${baseURL}/product-categories`)
    ])

    units.value = await unitRes.json()
    sections.value = await sectionRes.json()
    categories.value = await categoryRes.json()
  } catch (err) {
    console.error('Loading select options failed:', err)
  }
}

const handleFileChange = (e) => {
  form.value.photo = e.target.files[0]
}

const handleSubmit = async () => {
  const formData = new FormData()

  Object.keys(form.value).forEach((key) => {
    formData.append(key, form.value[key])
  })

  try {
    await fetch(`${baseURL}/products`, {
      method: 'POST',
      body: formData
    })
    router.push('/products')
  } catch (err) {
    console.error('Product submission failed:', err)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.form-container {
  max-width: 1000px;
  margin: 50px auto;
  background: #ffffff;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  margin-bottom: 25px;
  text-align: center;
}

.form-control:focus {
  box-shadow: none;
  border-color: #0d6efd;
}

.btn-primary {
  width: 100%;
  padding: 10px;
}
</style>
