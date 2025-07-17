<template>
  <div class="confirm-container" v-if="employeesalary">
    <p class="text-muted">Are you sure you want to delete this employee salary?</p>
    <h2>{{ employeesalary.id }}</h2>
    <h2>{{ employeesalary.name }}</h2>

    <div class="btn-group">
      <button class="btn btn-danger" @click="deleteEmployeeSalary">Yes, Delete</button>
      <router-link to="/employeesalarys" class="btn btn-success btn-back">Cancel</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const employeesalary = ref(null)

const fetchEmployeeSalary = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employeesalarys/${id}`)
    if (!res.ok) throw new Error('Employee salary not found')
    const data = await res.json()
    console.log('API Response:', data) 
    employeesalary.value = data.employeesalary ?? data
  } catch (error) {
    alert('Error loading data: ' + error.message)
    router.push('/employeesalarys')
  }
}

const deleteEmployeeSalary = async () => {
  if (!confirm('Are you sure you want to delete?')) return

  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employeesalarys/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) throw new Error('Failed to delete')
    alert('Deleted successfully')
    router.push('/employeesalarys')
  } catch (error) {
    alert('Delete failed: ' + error.message)
  }
}

onMounted(() => {
  fetchEmployeeSalary()
})
</script>

<style scoped>
.confirm-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.confirm-container h2 {
  margin-bottom: 20px;
  color: #dc3545;
}

.confirm-container p {
  font-size: 18px;
  margin-bottom: 30px;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn-danger {
  background-color: #dc3545;
  border: none;
  color: white;
  padding: 10px 25px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 8px;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-back {
  background-color: #28a745;
  color: white;
  text-decoration: none;
  padding: 10px 25px;
  font-size: 16px;
  border-radius: 8px;
}

.btn-back:hover {
  background-color: #218838;
}
</style>
