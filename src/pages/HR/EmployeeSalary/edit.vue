<template>
  <div>
    <router-link to="/employeesalarys" class="btn-back">← Back</router-link>

    <div class="form-container" v-if="salary">
      <h2>Edit Employee Salary</h2>
      <form @submit.prevent="updateSalary">
        <div class="form-group">
          <label for="name">Employee Name</label>
          <input v-model="form.name" type="text" id="name" required />
        </div>

        <div class="form-group">
          <label for="payment_date">Payment Date</label>
          <input v-model="form.payment_date" type="date" id="payment_date" required />
        </div>

        <div class="form-group">
          <label for="employee_administrator_id">Administrator ID</label>
          <input v-model="form.employee_administrator_id" type="text" id="employee_administrator_id" readonly />
        </div>

        <div class="form-group">
          <label for="payment_method_id">Payment Method ID</label>
          <input v-model="form.payment_method_id" type="text" id="payment_method_id" readonly />
        </div>

        <div class="form-group">
          <label for="total_amount">Total Amount</label>
          <input v-model="form.total_amount" type="text" id="total_amount" />
        </div>

        <div class="form-group">
          <label for="paid_amount">Paid Amount</label>
          <input v-model="form.paid_amount" type="text" id="paid_amount" />
        </div>

        <button type="submit" class="btn-submit">💾 Save</button>
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

const salary = ref(null)
const form = ref({
  name: '',
  payment_date: '',
  employee_administrator_id: '',
  payment_method_id: '',
  total_amount: '',
  paid_amount: ''
})

const fetchSalary = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employeesalarys/${id}`)
    const data = await res.json()

    salary.value = data.employeesalarys ?? data

    form.value.name = salary.value.name ?? ''
    form.value.payment_date = salary.value.payment_date ?? ''
    form.value.employee_administrator_id = salary.value.employee_administrator_id ?? ''
    form.value.payment_method_id = salary.value.payment_method_id ?? ''
    form.value.total_amount = salary.value.total_amount ?? ''
    form.value.paid_amount = salary.value.paid_amount ?? ''
  } catch (err) {
    alert('Error loading data')
    router.push('/employeesalarys')
  }
}

const updateSalary = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employeesalarys/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })

    if (!res.ok) throw new Error('Failed to update')
    alert('✅ Salary updated successfully')
    router.push('/employeesalarys')
  } catch (err) {
    alert('❌ Update failed')
  }
}

onMounted(fetchSalary)
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
input[type="date"] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}
.btn-submit {
  background-color: #005792;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
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
</style>
