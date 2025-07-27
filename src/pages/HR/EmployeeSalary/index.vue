<template>
  <div
    class="container mt-5 p-4"
    :style="{
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      maxWidth: '1200px',
    }"
  >
   <router-link
  to="/employeesalarys/create"
  class="btn btn-info mb-2 fw-bold fs-5 px-3 py-2"
>
  ➕ New Salary
</router-link>

    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead>
          <tr
            :style="{
              background:
                'linear-gradient(to right, #0d6efd, #3b82f6)',
              color: '#fff',
              textAlign: 'center',
            }"
          >
            <th>Id</th>
            <th>Name</th>
            <th>Payment Date</th>
            <th>Administrator</th>
            <th>Payment Method</th>
            <th>Total Amount</th>
            <th>Paid Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="8" class="text-center py-3">Loading...</td>
          </tr>
          <tr v-else-if="employeeSalaries.length === 0">
            <td
              colspan="8"
              class="no-data text-center fs-5 fw-medium py-4"
              :style="{ backgroundColor: '#fff3cd', color: '#856404' }"
            >
              No Employee Salary found.
            </td>
          </tr>
          <tr v-else v-for="salary in employeeSalaries" :key="salary.id">
            <td>{{ salary.id }}</td>
            <td>{{ salary.name }}</td>
            <td>{{ salary.payment_date }}</td>
            <td>{{ salary.administrator?.name || 'N/A' }}</td>
            <td>{{ salary.payment?.name || 'N/A' }}</td>
            <td>{{ salary.total_amount }}</td>
            <td>{{ salary.paid_amount }}</td>
            <td>
              <div class="btn-group">
                <router-link :to="`/employeesalarys/${salary.id}/edit`" class="btn btn-sm btn-primary me-1" >Edit </router-link>
                <router-link :to="`/employeesalarys/${salary.id}`"  class="btn btn-sm btn-success me-1" > View</router-link>
                <router-link :to="`/employeesalarys/delete/${salary.id}`" class="btn btn-sm btn-danger"> Delete</router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

const employeeSalaries = ref([]);
const loading = ref(true);

const fetchSalaries = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${baseUrl}/employeesalarys`);
    const data = await res.json();
    console.log("API Response:", data.employeesalarys);
    employeeSalaries.value = data.employeesalarys || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    employeeSalaries.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSalaries();
});
</script>

<style scoped>
.btn-group .btn {
  margin-right: 0.25rem;
}
</style>
