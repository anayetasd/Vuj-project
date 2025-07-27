<template>
  <div class="form-wrapper">
    <router-link class="btn-back" to="/finishedGoods">← Back to Finished Goods</router-link>

    <h2>Add New Finished Good</h2>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="product_name">Product Name</label>
        <input
          type="text"
          v-model="form.product_name"
          id="product_name"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input
          type="number"
          v-model.number="form.quantity"
          id="quantity"
          required
          min="0"
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="number"
          v-model.number="form.price"
          id="price"
          required
          min="0"
          step="0.01"
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="order_date">Order Date</label>
        <input
          type="date"
          v-model="form.order_date"
          id="order_date"
          required
          :disabled="loading"
        />
      </div>

      <div class="form-group">
        <label for="finished_good_status">Status</label>
        <select
          v-model="form.finished_good_status"
          id="finished_good_status"
          required
          :disabled="loading"
        >
          <option value="">-- Select Status --</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <input
        type="submit"
        :value="loading ? 'Saving...' : 'Save Finished Good'"
        :disabled="loading"
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const form = ref({
  product_name: "",
  quantity: null,
  price: null,
  order_date: "",
  finished_good_status: "",
});

const submitForm = async () => {
  loading.value = true;

  try {
    const response = await fetch(
      "http://anayet.intelsofts.com/project_app/public/api/finishedgoods",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form.value),
      }
    );

    if (!response.ok) {
      // যদি সার্ভার কোনো ত্রুটি দেয়
      const errData = await response.json();
      throw new Error(errData.message || "Failed to save finished good");
    }

    const data = await response.json();
    console.log("Saved:", data);

    alert("Finished Good saved successfully!");
    router.push("/finishedGoods");
  } catch (error) {
    console.error("Error saving finished good:", error);
    alert("Failed to save finished good: " + error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-wrapper {
  max-width: 1000px;
  margin: 40px auto;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
}

.form-wrapper h2 {
  text-align: center;
  margin-bottom: 25px;
  color: #0d6efd;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
  color: #333;
}

input[type="text"],
input[type="number"],
input[type="date"],
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}

input[type="submit"] {
  background-color: #0d6efd;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  width: 100%;
  margin-top: 15px;
}

input[type="submit"]:hover:not(:disabled) {
  background-color: #084fc2;
}

input[type="submit"]:disabled {
  background-color: #7baaf7;
  cursor: not-allowed;
}

.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  color: white;
  background: #6c757d;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  transition: 0.3s;
}

.btn-back:hover {
  background: #5a6268;
}
</style>
