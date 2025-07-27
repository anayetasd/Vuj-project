<template>
  <div class="form-container">
    <h2>➕ Add New Employee</h2>
    <form @submit.prevent="submitEmployee" enctype="multipart/form-data">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" id="name" />
      </div>

      <div class="form-group">
        <label for="employeeshift_id">Shift</label>
        <select v-model="form.employeeshift_id" required>
          <option value="" disabled>Select shift</option>
          <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
            {{ shift.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="employee_categorie_id">Category</label>
        <select v-model="form.employee_categorie_id" required>
          <option value="" disabled>Select category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="joining_date">Joining Date</label>
        <input v-model="form.joining_date" type="date" id="joining_date" />
      </div>

      <div class="form-group">
        <label for="photo">Photo</label>
        <input type="file" @change="handleFileUpload" />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input v-model="form.phone" type="text" id="phone" required />
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <textarea v-model="form.address" id="address"></textarea>
      </div>

      <button type="submit" class="btn-submit">Save Employee</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const form = ref({
  name: '',
  employeeshift_id: '',
  employee_categorie_id: '',
  joining_date: '',
  phone: '',
  address: '',
});

const photoFile = ref(null);
const shifts = ref([]);
const categories = ref([]);

const handleFileUpload = (e) => {
  photoFile.value = e.target.files[0];
};

const baseUrl = 'http://anayet.intelsofts.com/project_app/public/api';

const fetchDropdownData = async () => {
  try {
    const [shiftRes, categoryRes] = await Promise.all([
      fetch(`${baseUrl}/employeeshifts`),
      fetch(`${baseUrl}/employeecategories`)
    ]);

    const shiftData = await shiftRes.json();
    const categoryData = await categoryRes.json();

    shifts.value = shiftData.shifts ?? shiftData;
    categories.value = categoryData.categories ?? categoryData;
  } catch (err) {
    console.error("Dropdown fetch error:", err);
  }
};


const submitEmployee = async () => {
  console.log("📞 Sending phone number:", form.value.phone); // Debugging line

  const formData = new FormData();
  formData.append('name', form.value.name);
  formData.append('employeeshift_id', form.value.employeeshift_id);
  formData.append('employee_categorie_id', form.value.employee_categorie_id);
  formData.append('joining_date', form.value.joining_date);
  formData.append('phone', form.value.phone ?? '');  // fallback to empty string
  formData.append('address', form.value.address);
  if (photoFile.value) {
    formData.append('photo', photoFile.value);
  }

  try {
    const res = await fetch(`${baseUrl}/employees`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ Employee added successfully!');
      setTimeout(() => router.push('/employees'), 1000);
      // Optional: Reset form
      form.value = {
        name: '',
        employeeshift_id: '',
        employee_categorie_id: '',
        joining_date: '',
        phone: '',
        address: ''
      };
      photoFile.value = null;
    } else {
      alert('❌ Error: ' + JSON.stringify(data));
    }
  } catch (err) {
    alert('❌ Server error. Please try again.');
    console.error('Error submitting employee:', err);
  }
};

onMounted(() => {
  fetchDropdownData();
});
</script>

<style scoped>
.form-container {
  width: 1100px;
  margin: 40px auto;
  background: #fff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #34495e;
}

input[type="text"],
input[type="number"],
input[type="date"],
select,
textarea {
  padding: 10px 14px;
  font-size: 16px;
  border: 1.8px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s ease;
  font-family: inherit;
}

input[type="text"]:focus,
input[type="number"]:focus,
input[type="date"]:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #2980b9;
  box-shadow: 0 0 6px rgba(41, 128, 185, 0.4);
}

textarea {
  min-height: 80px;
  resize: vertical;
}

input[type="file"] {
  font-size: 16px;
  padding: 4px 0;
}

.btn-submit {
  display: block;
  width: 100%;
  padding: 12px 0;
  background-color: #2980b9;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.25s ease;
  margin-top: 12px;
}

.btn-submit:hover {
  background-color: #1c5980;
}

@media (max-width: 640px) {
  .form-container {
    padding: 20px 25px;
  }
  
  input[type="text"],
  input[type="number"],
  input[type="date"],
  select,
  textarea {
    font-size: 14px;
  }

  .btn-submit {
    font-size: 16px;
  }
}
</style>
