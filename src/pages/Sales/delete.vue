<template>
  <div class="container py-4" style="max-width: 600px;">
    <button @click="goBack" class="btn btn-success mb-3">Back</button>
    <p>Are you sure?</p>
    <h2 class="p-3">{{ sale.id }}</h2>

    <form @submit.prevent="handleDelete" class="p-3">
      <input type="submit" class="btn btn-danger" value="Confirm" />
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const sale = ref({ id: '' })

const fetchSale = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/sales/${route.params.id}`)
    if (!res.ok) throw new Error('Failed to fetch sale data')

    const data = await res.json()
    console.log('Sale API Response:', data)
    sale.value = data.sale ?? data
  } catch (err) {
    alert(err.message)
    router.push('/sales')
  }
}

onMounted(fetchSale)

const goBack = () => {
  router.push('/sales')  
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this sale?')) return

  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/sales/${sale.value.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message || 'Failed to delete sale')
    }

    alert('Sale deleted successfully!')
    router.push('/sales')
  } catch (error) {
    alert('Error: ' + error.message)
  }
}
</script>


<style scoped>
.container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 20px;
  margin: 40px auto;
  text-align: center;
}

.btn-success {
  font-weight: 600;
  border-radius: 8px;
}

.btn-danger {
  padding: 10px 25px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>
