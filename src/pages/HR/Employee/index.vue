<template>
  <div class="container table-container">
    <div class="header-section">
      <h2>Employee List</h2>
      <router-link class="btn btn-primary" to="/employees/create">+ New Employee</router-link>
    </div>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Shift</th>
          <th>Category</th>
          <th>Joining Date</th>
          <th>Photo</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
       <tr v-if="employees.length === 0">
  <td colspan="9" class="text-center text-muted">No Employee Found</td>
</tr>
<tr v-for="employee in employees" :key="employee.id">
  <td>{{ employee.id }}</td>
  <td>{{ employee.name }}</td>
  <td>{{ getShiftName(employee.employeeshift_id) }}</td>
  <td>{{ getCategoryName(employee.employee_categorie_id) }}</td>
  <td>{{ employee.joining_date }}</td>
  <td>
    <img
      v-if="employee.photo"
      :src="`/uploads/employees/${employee.photo}`"
      alt="photo"
    />
    <span v-else class="text-muted">No Photo</span>
  </td>
  <td>{{ employee.phone_number || 'N/A' }}</td>
  <td>{{ employee.address || 'N/A' }}</td>
  <td>
    <router-link class="btn btn-success" :to="`/employees/${employee.id}`">View</router-link>
    <router-link class="btn btn-info" :to="`/employees/${employee.id}/edit`">Edit</router-link>
    <router-link class="btn btn-warning" :to="`/employees/delete/${employee.id}`">Delete</router-link>
  </td>
</tr>
 
      </tbody>
    </table>

    <div class="d-flex justify-content-center" v-if="employees.total > employees.per_page">
      <button
        class="btn btn-outline-primary mx-1"
        v-if="employees.prev_page_url"
        @click="fetchEmployees(employees.current_page - 1)"
      >
        Previous
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        class="btn btn-outline-primary mx-1"
        :class="{ active: page === employees.current_page }"
        @click="fetchEmployees(page)"
      >
        {{ page }}
      </button>
      <button
        class="btn btn-outline-primary mx-1"
        v-if="employees.next_page_url"
        @click="fetchEmployees(employees.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const employees = ref([])

const shifts = { 1: 'Morning', 2: 'Evening', 3: 'Night', 4: 'Custom Shift' }
const categories = { 1: 'Manager', 2: 'Supervisor', 3: 'Worker', 4: 'Accountant', 5: 'Cleaner', 6: 'Security' }

const fetchEmployees = async () => {
  try {
    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/employees')
    const data = await res.json()
    employees.value = data.employees
  } catch (err) {
    console.error(err)
  }
}

const getShiftName = id => shifts[id] || 'N/A'
const getCategoryName = id => categories[id] || 'N/A'

onMounted(() => {
  fetchEmployees()
})
</script>


<style scoped>
.container {
  width: 1200px;
  margin: 40px auto;
  font-family: 'Segoe UI', sans-serif;
}

.table-container {
  background: #ffffff;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.header-section h2 {
  margin: 0;
  font-size: 28px;
  color: #2c3e50;
}

.btn {
  padding: 8px 14px;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-right: 6px;
  transition: all 0.25s ease;
  display: inline-block;
}
.btn-primary { background-color: #2980b9; color: #fff; }
.btn-success { background-color: #27ae60; color: #fff; }
.btn-info    { background-color: #16a085; color: #fff; }
.btn-warning { background-color: #f39c12; color: #fff; }
.btn-danger  { background-color: #c0392b; color: #fff; }

.btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  border: 1px solid #ccc;
}

thead tr {
  background-color: rgb(16, 119, 64);
  color: #ffffff;
}

th, td {
  padding: 14px 16px;
  text-align: left;
  vertical-align: middle;
  border: 1px solid #ddd;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #ecf0f1;
}

td img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.text-center {
  text-align: center;
}
.text-muted {
  color: #999;
}
.active {
  background-color: #2980b9 !important;
  color: white !important;
}
</style>
