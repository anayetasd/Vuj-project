<template>
  <div class="container">
    <router-link class="btn btn-info btn-new-supplier" to="/employeesalarys/create">
      ➕ New Employee_salary
    </router-link>

    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Payment date</th>
            <th>Administrator ID</th>
            <th>Payment Method ID</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="employeesalarys.length === 0">
            <td colspan="8" class="no-data">No Employee Salary found.</td>
          </tr>
          <tr v-for="salary in employeesalarys" :key="salary.id">
            <td>{{ salary.id }}</td>
            <td>{{ salary.name }}</td>
            <td>{{ salary.payment_date }}</td>
            <td>{{ salary.employee_administrator_id || 'N/A' }}</td>
            <td>{{ salary.payment_method_id || 'N/A' }}</td>
            <td>{{ salary.total_amount }}</td>
            <td>{{ salary.paid_amount }}</td>
            <td>
              <div class="btn-group">
                <router-link class="btn btn-sm btn-primary" :to="`/employeesalarys/${salary.id}/edit`">Edit</router-link>
                <router-link class="btn btn-sm btn-success" :to="`/employeesalarys/${salary.id}`">View</router-link>
                <router-link class="btn btn-sm btn-danger" :to="`/employeesalarys/delete/${salary.id}`">Delete</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const employeesalarys = ref([])

const fetchSalaries = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/employeesalarys`)
    const data = await res.json()
    employeesalarys.value = data.employeesalarys
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

onMounted(() => {
  fetchSalaries()
})
</script>

<style scoped>
.container {
  margin-top: 40px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 1200px;
}

.table thead th {
  background: linear-gradient(to right, #0d6efd, #3b82f6);
  color: #ffffff;
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  padding: 15px;
}

.table td {
  text-align: center;
  vertical-align: middle;
  font-size: 16px;
  padding: 14px;
  height: 60px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.btn-group a {
  margin: 0 4px;
  min-width: 70px;
}

.btn-new-supplier {
  margin-bottom: 20px;
  font-weight: bold;
  letter-spacing: 0.5px;
  font-size: 16px;
  padding: 10px 20px;
}

.no-data {
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  padding: 20px;
  background-color: #fff3cd;
  color: #856404;
}
</style>
