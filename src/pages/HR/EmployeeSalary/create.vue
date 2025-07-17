<template>
  <div class="form-container">
    <h2>New Employee Salary</h2>
    <form @submit.prevent="submitForm">
      <div class="form-grid">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="form.name" type="text" id="name" />
        </div>

        <div class="form-group">
          <label for="payment_date">Payment Date</label>
          <input v-model="form.payment_date" type="date" id="payment_date" />
        </div>

        <div class="form-group">
          <label for="employee_administrator_id">Administrator</label>
          <select v-model="form.employee_administrator_id" id="employee_administrator_id">
            <option value="">-- Select --</option>
            <option v-for="admin in administrators" :key="admin.id" :value="admin.id">
              {{ admin.role }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="payment_method_id">Payment Method</label>
          <select v-model="form.payment_method_id" id="payment_method_id">
            <option value="">-- Select --</option>
            <option v-for="payment in payments" :key="payment.id" :value="payment.id">
              {{ payment.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="total_amount">Total Amount</label>
          <input v-model="form.total_amount" type="text" id="total_amount" />
        </div>

        <div class="form-group">
          <label for="paid_amount">Paid Amount</label>
          <input v-model="form.paid_amount" type="text" id="paid_amount" />
        </div>

        <button type="submit" class="btn-submit">💾 Save Salary</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  name: '',
  payment_date: '',
  employee_administrator_id: '',
  payment_method_id: '',
  total_amount: '',
  paid_amount: '',
})

const administrators = ref([])
const payments = ref([])

const fetchData = async () => {
  try {
    const res1 = await fetch('http://anayet.intelsofts.com/project_app/public/api/employee-administrators')
    const res2 = await fetch('http://anayet.intelsofts.com/project_app/public/api/payment-methods')

    administrators.value = await res1.json()
    payments.value = await res2.json()
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const submitForm = async () => {
  try {
    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/employeesalarys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) throw new Error('Failed to save')

    const data = await res.json()
    alert('Employee Salary Saved!')
    router.push('/employeesalarys')
  } catch (error) {
    alert('Error saving salary: ' + error.message)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.form-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-container h2 {
  text-align: center;
  margin-bottom: 35px;
  color: #0d6efd;
  font-weight: 700;
  font-size: 28px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

.form-group input,
.form-group select {
  padding: 12px 14px;
  border: 1px solid #ced4da;
  border-radius: 10px;
  font-size: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
  outline: none;
}

.btn-submit {
  display: block;
  width: 200px;
  margin: 0 auto;
  padding: 12px;
  font-size: 16px;
  background-color: #198754;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  text-align: center;
}

.btn-submit:hover {
  background-color: #157347;
}
</style>
