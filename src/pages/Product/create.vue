<template>
  <div class="container">
    <div class="form-container mt-5">
      <h2>Create New Product</h2>
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <div class="mb-3">
          <label class="form-label">Product Name</label>
          <select v-model="formData.name" class="form-select" required>
            <option value="">Select Product</option>
            <option v-for="item in productNames" :key="item.id" :value="item.name">
              {{ item.name }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Product Photo</label>
          <input
            type="file"
            class="form-control"
            @change="handleFileChange"
            accept="image/*"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Regular Price</label>
          <input
            type="number"
            step="0.01"
            class="form-control"
            v-model="formData.regular_price"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Offer Price</label>
          <input
            type="number"
            step="0.01"
            class="form-control"
            v-model="formData.offer_price"
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Barcode</label>
          <input
            type="text"
            class="form-control"
            v-model="formData.barcode"
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">
          💾 Save Product
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const productNames = ref([]);
const formData = ref({
  name: "",
  photo: null,
  regular_price: "",
  offer_price: "",
  barcode: "",
});

const handleFileChange = (e) => {
  formData.value.photo = e.target.files[0];
};

onMounted(async () => {
  try {
    const res = await fetch("http://anayet.intelsofts.com/project_app/public/api/products");
    const data = await res.json();
    productNames.value = data.products;
  } catch (err) {
    console.error("Error fetching products:", err);
  }
});

const handleSubmit = async () => {
  const productData = new FormData();
  for (const key in formData.value) {
    if (formData.value[key]) {
      productData.append(key, formData.value[key]);
    }
  }

  try {
    const res = await fetch("http://anayet.intelsofts.com/project_app/public/api/products", {
      method: "POST",
      body: productData,
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      if (res.ok) {
        alert("✅ Product created successfully!");
        formData.value = {
          name: "",
          photo: null,
          regular_price: "",
          offer_price: "",
          barcode: "",
        };
      } else {
        alert("❌ Failed: " + (data.message || "Server error"));
      }
    } catch {
      console.error("Raw server response:", text);
      alert("❌ Server returned invalid JSON (maybe HTML). Check server logs.");
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
};
</script>

<style scoped>
.form-container {
  max-width: 1000px;
  margin: 40px auto;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
}
</style>
