<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const purchaseId = route.params.id

const suppliers = ref([])
const purchase = ref({
  supplier_id: '',
  purchase_date: '',
  shipping_address: '',
  purchase_total: '',
  paid_amount: '',
  discount: ''
})

const fetchSuppliers = async () => {
  try {
    const res = await fetch('http://anayet.intelsofts.com/project_app/public/api/suppliers')
    const data = await res.json()
    suppliers.value = data.suppliers ?? data
  } catch (err) {
    console.error('Failed to load suppliers:', err)
  }
}

const fetchPurchase = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/purchases/${purchaseId}`)
    const data = await res.json()

    
    purchase.value = data.purchase ?? data

  
    if (purchase.value.purchase_date) {
      purchase.value.purchase_date = purchase.value.purchase_date.substring(0, 10)
    }

    console.log('Loaded purchase:', purchase.value)
  } catch (err) {
    console.error('Failed to load purchase:', err)
  }
}


const updatePurchase = async () => {
  try {
    const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/purchases/${purchaseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(purchase.value)
    })
    const data = await res.json()
    if (data.msg === 'Success') {
      alert('Purchase updated successfully!')
      router.push('/purchases')
    } else {
      alert('Update failed.')
    }
  } catch (err) {
    alert('API error.')
    console.error(err)
  }
}

onMounted(() => {
  fetchSuppliers()
  fetchPurchase()
})
</script>

<template>
  <div class="form-container">
    <router-link class="btn-back" to="/purchases">← Back to Purchases</router-link>

    <h2>Edit Purchase</h2>
    <form @submit.prevent="updatePurchase">
      <div class="form-group">
        <label for="supplier_id">Supplier</label>
        <select v-model="purchase.supplier_id" required>
          <option value="" disabled>Select a supplier</option>
          <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="purchase_date">Purchase Date</label>
        <input type="date" v-model="purchase.purchase_date" required />
      </div>

      <div class="form-group">
        <label for="shipping_address">Shipping Address</label>
        <input type="text" v-model="purchase.shipping_address" required />
      </div>

      <div class="form-group">
        <label for="purchase_total">Purchase Total</label>
        <input type="number" step="0.01" v-model="purchase.purchase_total" required />
      </div>

      <div class="form-group">
        <label for="paid_amount">Paid Amount</label>
        <input type="number" step="0.01" v-model="purchase.paid_amount" required />
      </div>

      <div class="form-group">
        <label for="discount">Discount</label>
        <input type="number" step="0.01" v-model="purchase.discount" />
      </div>

      <button type="submit" class="btn-submit">Update Purchase</button>
    </form>
  </div>
</template>

<style scoped>
/* Same styles from your original Blade template */
.form-container {
  max-width: 1100px;
  margin: 30px auto;
  padding: 25px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.form-container h2 {
  margin-bottom: 25px;
  text-align: center;
  color: #28a745;
}
.form-group {
  margin-bottom: 18px;
}
label {
  font-weight: bold;
  margin-bottom: 6px;
  display: block;
  color: #333;
}
input,
select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  transition: border 0.2s ease;
}
input:focus,
select:focus {
  border-color: #28a745;
  outline: none;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.3);
}
.btn-submit {
  width: 20%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-submit:hover {
  background-color: #218838;
}
.btn-back {
  display: inline-block;
  margin-bottom: 20px;
  background-color: rgb(20, 151, 59);
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
}
.btn-back:hover {
  background-color: rgb(22, 181, 33);
}
</style>
