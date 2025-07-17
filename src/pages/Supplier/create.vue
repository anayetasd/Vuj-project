<template>
  <div class="form-container">
    <h2>New Supplier</h2>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" id="name" placeholder="Enter supplier name" required />
      </div>

      <div class="form-group">
        <label for="mobile">Mobile</label>
        <input v-model="form.mobile" type="text" id="mobile" placeholder="Enter mobile number" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="form.email" type="text" id="email" placeholder="Enter email address" />
      </div>

      <div class="form-group">
        <label for="photo">Photo</label>
        <input type="file" id="photo" @change="handleFileUpload" />
      </div>

      <button type="submit" class="btn-submit">💾 Save Supplier</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SupplierCreate",
  data() {
    return {
      form: {
        name: "",
        mobile: "",
        email: "",
        photo: null,
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.photo = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("mobile", this.form.mobile);
      formData.append("email", this.form.email);
      if (this.form.photo) {
        formData.append("photo", this.form.photo);
      }

      try {
        const response = await fetch("http://anayet.intelsofts.com/project_app/public/api/suppliers", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          alert("Error: " + JSON.stringify(error));
          return;
        }

        alert("✅ Supplier saved successfully!");
        this.$router.push("/suppliers");
      } catch (error) {
        console.error("Submission error:", error);
        alert("❌ Failed to save supplier.");
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 1150px;
  margin: 40px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #0d6efd;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 500;
  display: block;
  margin-bottom: 8px;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="file"] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #0d6efd;
  outline: none;
}

.btn-submit {
  width: 20%;
  padding: 12px;
  font-size: 16px;
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #0b5ed7;
}
</style>
