<template>
  <div class="confirm-container" v-if="mr">
    <h2>Delete Money Receipt #{{ mr.id }}</h2>
    <p>Are you sure you want to delete this Money Receipt?</p>

    <form @submit.prevent="deleteReceipt">
      <input class="btn btn-danger" type="submit" value="Yes, Confirm Delete" />
    </form>

    <router-link class="btn-back" to="/mrs">← Cancel</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const mr = ref(null)
const id = route.params.id

const fetchMr = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/mrs/${id}`)
    const data = await res.json()
    mr.value = data.mr ?? data
  } catch (err) {
    console.error('Failed to load MR:', err)
  }
}

const deleteReceipt = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/mrs/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    })

    if (res.ok) {
      alert('Money Receipt deleted successfully!')
      router.push('/mrs')
    } else {
      alert('Delete failed.')
    }
  } catch (err) {
    console.error('Delete error:', err)
  }
}

onMounted(fetchMr)
</script>

<style scoped>
.confirm-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background-color: #fff3f3;
  border: 1px solid #f5c6cb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.confirm-container h2 {
  color: #dc3545;
  margin-bottom: 20px;
}

.confirm-container p {
  font-size: 18px;
  margin-bottom: 30px;
}

.btn-danger {
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-back {
  margin-top: 20px;
  display: inline-block;
  background-color: #6c757d;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
}

.btn-back:hover {
  background-color: #5a6268;
}
</style>
