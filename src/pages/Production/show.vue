<template>
  <div>
    <router-link class="btn btn-success" :style="styles.backButton" to="/productions">
      ← Back
    </router-link>

    <div class="table-container" :style="styles.container" v-if="production">
      <table class="table-view" :style="styles.table">
        <tbody>
          <tr>
            <td :style="styles.cellLabel">Production Date:</td>
            <td :style="styles.cellValue">{{ production.production_date }}</td>
          </tr>

          <tr :style="styles.rowStriped">
            <td :style="styles.cellLabel">Product Name:</td>
            <td :style="styles.cellValue">{{ getProductName(production.product_id) }}</td>
          </tr>

          <tr>
            <td :style="styles.cellLabel">Raw Material Used:</td>
            <td :style="styles.cellValue">{{ getRawMaterialName(production.raw_material_id) }}</td>
          </tr>

          <tr :style="styles.rowStriped">
            <td :style="styles.cellLabel">Total Produced:</td>
            <td :style="styles.cellValue">{{ production.quantity_produced }}</td>
          </tr>

          <tr>
            <td :style="styles.cellLabel">Unit:</td>
            <td :style="styles.cellValue">{{ production.unit }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="error" class="alert alert-danger">Error: {{ error }}</div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api'

const production = ref(null)
const products = ref([])
const rawMaterials = ref([])
const error = ref(null)

const styles = {
  container: {
    maxWidth: '900px',
    margin: '30px auto',
    background: '#fff',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  cellLabel: {
    fontWeight: 'bold',
    width: '40%',
    backgroundColor: '#f0f0f0',
    padding: '12px 15px',
    border: '1px solid #ddd',
    color: '#333',
  },
  cellValue: {
    padding: '12px 15px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: '#333',
  },
  rowStriped: {
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    margin: '20px',
    display: 'inline-block',
    padding: '0.375rem 0.75rem',
    color: '#fff',
    backgroundColor: '#198754',
    borderRadius: '0.25rem',
    textDecoration: 'none',
    fontWeight: '500',
  },
}

async function fetchData() {
  try {
    const [prodRes, prodListRes, rawMatRes] = await Promise.all([
      fetch(`${baseUrl}/productions/${id}`, { headers: { Accept: 'application/json' } }),
      fetch(`${baseUrl}/products`, { headers: { Accept: 'application/json' } }),
      fetch(`${baseUrl}/rawmaterials`, { headers: { Accept: 'application/json' } }),
    ])

    if (!prodRes.ok || !prodListRes.ok || !rawMatRes.ok) {
      throw new Error('Failed to fetch data')
    }

    const prodData = await prodRes.json()
    const productListData = await prodListRes.json()
    const rawMaterialData = await rawMatRes.json()

    production.value = prodData.production || null
    products.value = productListData.products || []
    rawMaterials.value = rawMaterialData.rawmaterials || []
  } catch (err) {
    error.value = err.message
    console.error('Fetch error:', err)
  }
}

const getProductName = (productId) => {
  const product = products.value.find((p) => p.id == productId)
  return product ? product.name : 'Unknown Product'
}

const getRawMaterialName = (rawMaterialId) => {
  const rawMaterial = rawMaterials.value.find((r) => r.id == rawMaterialId)
  return rawMaterial ? rawMaterial.name : 'Unknown Raw Material'
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.alert-danger {
  max-width: 900px;
  margin: 30px auto;
  padding: 10px 15px;
  color: #842029;
  background-color: #f8d7da;
  border-radius: 4px;
  border: 1px solid #f5c2c7;
  font-size: 16px;
  text-align: center;
}
</style>
