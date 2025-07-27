<template>
  <div class="form-container">
    <h2>New Employee Salary</h2>
    <form @submit.prevent="submitForm">
      <div class="form-grid">

        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="form.name" type="text" id="name" required />
        </div>

        <!-- <div class="form-group">
          <label for="employee_id">Employee Name</label>
          <select v-model="form.employee_id" id="employee_id" required>
            <option value="">-- Select --</option>
            <option v-for="emp in employees" :key="emp.id" :value="emp.id">
              {{ emp.name }}
            </option>
          </select>
        </div> -->

        <div class="form-group">
          <label for="payment_date">Payment Date</label>
          <input v-model="form.payment_date" type="date" id="payment_date" required />
        </div>

        <div class="form-group">
          <label for="employee_administrator_id">Administrator</label>
          <select v-model="form.employee_administrator_id" id="employee_administrator_id" required>
            <option value="">-- Select --</option>
            <option v-for="admin in administrators" :key="admin.id" :value="admin.id">
              {{ admin.name || admin.role }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="payment_method_id">Payment Method</label>
          <select v-model="form.payment_method_id" id="payment_method_id" required>
            <option value="">-- Select --</option>
            <option v-for="payment in payments" :key="payment.id" :value="payment.id">
              {{ payment.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="total_amount">Total Amount</label>
          <input v-model="form.total_amount" type="number" id="total_amount" required />
        </div>

        <div class="form-group">
          <label for="paid_amount">Paid Amount</label>
          <input v-model="form.paid_amount" type="number" id="paid_amount" required />
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
  // employee_id: '',
  payment_date: '',
  employee_administrator_id: '',
  payment_method_id: '',
  total_amount: '',
  paid_amount: '',
})

const administrators = ref([])
const payments = ref([])
const employees = ref([])

const fetchData = async () => {
  try {
    const [adminRes, paymentRes, empRes] = await Promise.all([
      fetch('http://anayet.intelsofts.com/project_app/public/api/administrators'),
      fetch('http://anayet.intelsofts.com/project_app/public/api/paymentmethods'),
      fetch('http://anayet.intelsofts.com/project_app/public/api/employees'),
    ])

    const adminData = await adminRes.json()
    const paymentData = await paymentRes.json()
    const employeeData = await empRes.json()

    administrators.value = adminData.data || adminData
    payments.value = paymentData.data || paymentData
    employees.value = employeeData.employees || []
  } catch (error) {
    console.error('Error fetching data:', error)
    alert('Error fetching dropdown data.')
  }
}

const submitForm = async () => {
  // Optional: Frontend Validation
  if (
    !form.value.name ||
    !form.value.payment_date ||
    !form.value.employee_administrator_id ||
    !form.value.payment_method_id ||
    !form.value.total_amount ||
    !form.value.paid_amount
  ) {
    alert('Please fill in all required fields.')
    return
  }

  try {
    const payload = {
      name: form.value.name,
      payment_date: form.value.payment_date,
      employee_administrator_id: form.value.employee_administrator_id,
      payment_method_id: form.value.payment_method_id,
      total_amount: Number(form.value.total_amount),
      paid_amount: Number(form.value.paid_amount),
    }

    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/employeesalarys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Failed to save salary')
    }

    alert('✅ Employee Salary Saved Successfully!')
    router.push('/employeesalarys')
  } catch (error) {
    console.error('Submit error:', error)
    alert('❌ Error saving salary: ' + error.message)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.form-container {
  max-width: 1000px;
  margin: 40px auto;
  padding: 30px 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-container h2 {
  text-align: center;
  color: #0d6efd;
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 30px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  font-size: 15px;
}

.form-group input,
.form-group select {
  padding: 10px 14px;
  font-size: 15px;
  border: 1.5px solid #ced4da;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 6px rgba(13, 110, 253, 0.25);
  outline: none;
}

.btn-submit {
  grid-column: 1 / -1;
  padding: 14px;
  font-size: 17px;
  font-weight: 700;
  color: #fff;
  background-color: #198754;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  width: 20%;
}

.btn-submit:hover {
  background-color: #157347;
}

@media (max-width: 600px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
