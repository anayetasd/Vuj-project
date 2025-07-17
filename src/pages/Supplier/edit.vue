<template>
  <div>
    <router-link class="btn btn-success btn-back" to="/suppliers">← Back to Suppliers</router-link>

    <div class="form-container">
      <h2>Edit Supplier</h2>
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="form.name" type="text" id="name" required />
        </div>

        <div class="form-group">
          <label for="mobile">Mobile</label>
          <input v-model="form.mobile" type="text" id="mobile" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" type="text" id="email" />
        </div>

        <div class="form-group">
          <label for="photo">Photo</label>
          <input type="file" id="photo" @change="handleFileUpload" />
        </div>

        <button type="submit" class="btn-submit">✅ Update Supplier</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupplierEdit",
  data() {
    return {
      form: {
        name: "",
        mobile: "",
        email: "",
        photo: null,
      },
      baseUrl: "http://anayet.intelsofts.com/project_app/public/api/",
    };
  },
  mounted() {
    this.fetchSupplier();
  },
  methods: {
    async fetchSupplier() {
      try {
        const id = this.$route.params.id;
        const res = await fetch(`${this.baseUrl}suppliers/${id}`);
        const data = await res.json();

       
        const supplier = data.supplier ?? data;

        this.form.name = supplier.name;
        this.form.mobile = supplier.mobile;
        this.form.email = supplier.email;
      } catch (err) {
        console.error("❌ Failed to load supplier:", err);
        alert("Failed to load supplier data.");
      }
    },
    handleFileUpload(event) {
      this.form.photo = event.target.files[0];
    },
    async submitForm() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("mobile", this.form.mobile);
      formData.append("email", this.form.email);
      formData.append("_method", "PUT"); // for Laravel method spoofing

      if (this.form.photo) {
        formData.append("photo", this.form.photo);
      }

      try {
        const res = await fetch(`${this.baseUrl}suppliers/${id}`, {
          method: "POST", // we use POST + _method=PUT
          body: formData,
        });

        if (!res.ok) {
          const err = await res.json();
          alert("❌ Update failed: " + JSON.stringify(err));
          return;
        }

        alert("✅ Supplier updated successfully!");
        this.$router.push("/suppliers");
      } catch (err) {
        console.error("❌ Error updating supplier:", err);
        alert("Failed to update supplier.");
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
  color: #198754;
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
  border-color: #198754;
  outline: none;
}

.btn-submit {
  width: 20%;
  padding: 12px;
  font-size: 16px;
  background-color: #198754;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #157347;
}

.btn-back {
  margin: 20px auto 0;
  display: block;
  width: fit-content;
}
</style>
