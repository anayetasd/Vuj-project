<template>
  <div>
    <router-link to="/employees" class="btn-back">← Back</router-link>

    <div class="form-container" v-if="employee">
      <h2>Edit Employee</h2>
      <form @submit.prevent="updateEmployee">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="form.name" type="text" id="name" required />
        </div>

        <div class="form-group">
          <label for="joining_date">Joining Date</label>
          <input v-model="form.joining_date" type="date" id="joining_date" required />
        </div>

        <div class="form-group">
          <label for="photo">Photo</label>
          <input @change="handleFileUpload" type="file" id="photo" />
          <div class="photo-preview" v-if="employee.photo">
            <img :src="`/uploads/employees/${employee.photo}`" alt="Current Photo" />
          </div>
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <textarea v-model="form.address" id="address" required></textarea>
        </div>

        <button type="submit" class="btn-submit">💾 Save Employee</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const employeeId = route.params.id

const employee = ref(null)
const form = ref({
  name: '',
  joining_date: '',
  address: '',
  photo: null,
})

const fetchEmployee = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employees/${employeeId}`)
    const data = await res.json()
    
    employee.value = data.employee ?? data
    
    form.value.name = employee.value.name ?? ''
    form.value.joining_date = employee.value.joining_date ?? ''
    form.value.address = employee.value.address ?? ''
  } catch (err) {
    console.error(err)
  }
}

const handleFileUpload = (event) => {
  form.value.photo = event.target.files[0]
}

const updateEmployee = async () => {
  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('joining_date', form.value.joining_date)
    formData.append('address', form.value.address)
    if (form.value.photo) {
      formData.append('photo', form.value.photo)
    }

    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employees/${employeeId}`, {
      method: 'POST',
      headers: {
        'X-HTTP-Method-Override': 'PUT'
      },
      body: formData
    })

    if (!res.ok) throw new Error('Failed to update')

    alert("Employee updated successfully")
    router.push('/employees')
  } catch (err) {
    console.error(err)
    alert("Error updating employee.")
  }
}

onMounted(() => {
  fetchEmployee()
})
</script>

<style scoped>
.form-container {
  max-width: 1200px;
  margin: 40px auto;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', sans-serif;
}

.form-container h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #005792;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input[type="text"],
input[type="date"],
input[type="file"],
textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.btn-submit {
  background-color: #005792;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-submit:hover {
  background-color: #003f66;
}

.btn-back {
  display: inline-block;
  margin: 20px auto 10px 40px;
  text-decoration: none;
  background-color: #28a745;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 15px;
}

.btn-back:hover {
  background-color: #218838;
}

.photo-preview {
  margin-top: 10px;
}

.photo-preview img {
  height: 60px;
  border-radius: 6px;
}
</style>
