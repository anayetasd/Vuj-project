<template>
  <div class="form-container">
    <router-link class="btn-back" to="/employeesalarys">
      ← Back to Employee Salary
    </router-link>

    <h2>Edit Employee Salary</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Employee Name</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
        />
      </div>

      <div class="form-group">
        <label for="payment_date">Payment Date</label>
        <input
          type="date"
          id="payment_date"
          v-model="form.payment_date"
          required
        />
      </div>

      <div class="form-group">
        <label for="employee_administrator_id">Administrator</label>
        <select
          id="employee_administrator_id"
          v-model="form.employee_administrator_id"
          required
        >
          <option value="">-- Select Administrator --</option>
          <option v-for="admin in administrators" :key="admin.id" :value="admin.id">
            {{ admin.role || admin.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="payment_method_id">Payment Method</label>
        <select
          id="payment_method_id"
          v-model="form.payment_method_id"
          required
        >
          <option value="">-- Select Payment Method --</option>
          <option v-for="pay in payments" :key="pay.id" :value="pay.id">
            {{ pay.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="total_amount">Total Amount</label>
        <input
          type="number"
          id="total_amount"
          v-model="form.total_amount"
        />
      </div>

      <div class="form-group">
        <label for="paid_amount">Paid Amount</label>
        <input
          type="number"
          id="paid_amount"
          v-model="form.paid_amount"
        />
      </div>

      <button type="submit" class="btn-submit">
        ✅ Update Salary
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const baseUrl = "http://anayet.intelsofts.com/project_app/public/api";

const form = ref({
  name: "",
  payment_date: "",
  employee_administrator_id: "",
  payment_method_id: "",
  total_amount: "",
  paid_amount: "",
});

const administrators = ref([]);
const payments = ref([]);

const fetchSalary = async () => {
  try {
    const res = await fetch(`${baseUrl}/employeesalarys/${id}`);
    const data = await res.json();
    const salaryData = data.employeesalary ?? data;

    form.value.name = salaryData.name || "";
    form.value.payment_date = salaryData.payment_date || "";
    form.value.employee_administrator_id = salaryData.employee_administrator_id || "";
    form.value.payment_method_id = salaryData.payment_method_id || "";
    form.value.total_amount = salaryData.total_amount || "";
    form.value.paid_amount = salaryData.paid_amount || "";
  } catch (err) {
    console.error("Error fetching salary:", err);
    alert("Error loading salary data.");
  }
};

const fetchAdministrators = async () => {
  try {
    const res = await fetch(`${baseUrl}/administrators`);
    if (!res.ok) throw new Error("Failed to fetch administrators");
    const data = await res.json();
    administrators.value = data.data || data || [];
  } catch (err) {
    console.error("Error loading administrators:", err);
    administrators.value = [];
  }
};

const fetchPayments = async () => {
  try {
    const res = await fetch(`${baseUrl}/paymentmethods`);
    const data = await res.json();
    payments.value = data.data || data || [];
  } catch (err) {
    console.error("Error loading payment methods:", err);
    payments.value = [];
  }
};

const handleSubmit = async () => {
  try {
    const res = await fetch(`${baseUrl}/employeesalarys/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (!res.ok) throw new Error("Failed to update salary");

    alert("✅ Salary updated successfully!");
    router.push("/employeesalarys");
  } catch (err) {
    console.error("Update error:", err);
    alert("❌ Failed to update salary.");
  }
};

onMounted(() => {
  fetchSalary();
  fetchAdministrators();
  fetchPayments();
});
</script>

<style scoped>
.form-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 30px 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}
.form-container h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #198754;
  font-weight: bold;
}
.form-group {
  margin-bottom: 25px;
}
.form-group label {
  font-weight: 600;
  display: block;
  margin-bottom: 10px;
  color: #212529;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fefefe;
}
.form-group input:focus,
.form-group select:focus {
  border-color: #198754;
  outline: none;
  background-color: #fff;
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
}
.btn-submit:hover {
  background-color: #157347;
}
.btn-back {
  display: inline-block;
  margin-bottom: 30px;
  background-color: #198754;
  color: white;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 8px;
  text-decoration: none;
}
.btn-back:hover {
  background-color: #157347;
  color: #fff;
}
</style>
