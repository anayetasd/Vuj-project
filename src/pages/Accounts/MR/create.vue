<template>
  <div class="receipt-wrapper">
    <div class="receipt-header">
      <h1>{{ company.name }}</h1>
      <p>{{ company.address }}</p>
      <h2 style="margin-top: 10px;">Money Receipt</h2>
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label for="customer_id">Customer</label>
        <select v-model="form.customer_id" id="customer_id">
          <option value="" disabled>Select Customer</option>
          <option v-for="cust in customers" :key="cust.id" :value="cust.id">
            {{ cust.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="receipt_date">Date</label>
        <input type="date" v-model="form.receipt_date" id="receipt_date" />
      </div>

      <div class="form-group">
        <label for="mr_id">Receipt ID</label>
        <input type="text" :value="nextReceiptId" readonly />
      </div>

      <div class="form-group">
        <label for="shipping_address">Shipping Address</label>
        <textarea v-model="form.shipping_address" id="shipping_address" rows="2"></textarea>
      </div>

      <div class="form-group">
        <label for="remark">Remark</label>
        <textarea v-model="form.remark" id="remark" rows="2"></textarea>
      </div>
    </div>

    <table class="receipt-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.price.toFixed(2) }}</td>
          <td>{{ item.discount.toFixed(2) }}</td>
         <td>{{ ((item.price - (item.discount || 0)) * item.qty).toFixed(2) }}</td>

          <td>
            <button class="btn btn-danger btn-sm" @click="removeItem(index)">X</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <select v-model="newItem.product_id" id="product_id">
              <option value="" disabled>Select Product</option>
              <option v-for="prod in products" :key="prod.id" :value="prod.id">
                {{ prod.name }}
              </option>
            </select>
          </td>
          <td>
            <input type="number" v-model.number="newItem.qty" min="1" />
          </td>
          <td>
            <input type="number" v-model.number="newItem.price" min="0" />
          </td>
          <td>
            <input type="number" v-model.number="newItem.discount" min="0" />
          </td>
          <td></td>
          <td>
            <button class="btn btn-primary" @click="addItem">+</button>
          </td>
        </tr>
      </tfoot>
    </table>

    <div class="summary">
      Total: {{ total.toFixed(2) }}
    </div>

    <div class="btn-group-actions">
      <button @click="printReceipt" class="btn btn-primary">🖨 Print</button>
      <button class="btn btn-success" @click="submitReceipt">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoneyReceipt",
  data() {
    return {
      company: {
        name: "Loading...",
        address: "",
      },
      customers: [],
      products: [],
      lastReceiptId: 0,
      form: {
        customer_id: "",
        receipt_date: "",
        shipping_address: "",
        remark: "",
      },
      items: [],
      newItem: {
        product_id: "",
        price: 0,
        discount: 0,
        qty: 1,
      },
      loading: false,
    };
  },
  computed: {
    total() {
      return this.items.reduce((sum, item) => {
        return sum + (item.price - item.discount) * item.qty;
      }, 0);
    },

    nextReceiptId() {
      return this.lastReceiptId + 1;
    },
  },
  methods: {
  formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },

    async fetchInitialData() {
      try {
        const [companyRes, custRes, prodRes, mrRes] = await Promise.all([
          fetch("http://anayet.intelsofts.com/project_app/public/api/companies"),
          fetch("http://anayet.intelsofts.com/project_app/public/api/customers"),
          fetch("http://anayet.intelsofts.com/project_app/public/api/products"),
          fetch("http://anayet.intelsofts.com/project_app/public/api/mrs/last"),
        ]);

        if (!companyRes.ok || !custRes.ok || !prodRes.ok || !mrRes.ok) {
          throw new Error("Failed to fetch initial data");
        }

        const companyData = await companyRes.json();
        const customersData = await custRes.json();
        const productsData = await prodRes.json();
        const mrData = await mrRes.json();

        this.company = companyData.company || { name: "Company", address: "" };
        this.customers = customersData.customers || [];
        this.products = productsData.products || [];
        this.lastReceiptId = mrData.last_id || 0;

        if (this.customers.length > 0) {
          this.form.customer_id = this.customers[0].id;
        }
      } catch (err) {
        alert("Error loading initial data: " + err.message);
        console.error(err);
      }
    },
    addItem() {
  if (!this.newItem.product_id) {
    alert("Please select a product.");
    return;
  }

  if (isNaN(this.newItem.price) || this.newItem.price <= 0) {
    alert("Price must be a valid number greater than zero.");
    return;
  }

  if (isNaN(this.newItem.discount) || this.newItem.discount < 0) {
    alert("Discount must be a valid number and not negative.");
    return;
  }

  if (isNaN(this.newItem.qty) || this.newItem.qty <= 0) {
    alert("Quantity must be at least 1.");
    return;
  }

  if (this.newItem.discount > this.newItem.price) {
    alert("Discount cannot be more than price.");
    return;
  }

  const product = this.products.find(p => p.id === this.newItem.product_id);
  if (!product) {
    alert("Selected product not found.");
    return;
  }

  this.items.push({
    product_id: this.newItem.product_id,
    name: product.name,
    price: this.newItem.price,
    discount: this.newItem.discount,
    qty: this.newItem.qty,
    vat: 0,
  });

  // Reset input fields
  this.newItem.product_id = "";
  this.newItem.price = 0;
  this.newItem.discount = 0;
  this.newItem.qty = 1;
},

    removeItem(index) {
      this.items.splice(index, 1);
    },
    printReceipt() {
      window.print();
    },
    async submitReceipt() {
      if (this.items.length === 0) {
        alert("No items added.");
        return;
      }
      if (!this.form.customer_id) {
        alert("Please select a customer.");
        return;
      }

      const data = {
        customer_id: this.form.customer_id,
        receipt_date: this.form.receipt_date,
        shipping_address: this.form.shipping_address,
        remark: this.form.remark,
        receipt_total: this.total,
        paid_amount: this.total,
        discount: 0,
        vat: 0,
        items: this.items.map((item) => ({
          product_id: item.product_id,
          price: item.price,
          qty: item.qty,
          vat: item.vat,
          discount: item.discount,
        })),
      };

      try {
        this.loading = true;
        const res = await fetch(
          "http://anayet.intelsofts.com/project_app/public/api/mrs",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const json = await res.json();

        if (json.message === "Money Receipt Saved Successfully" && json.mr_id) {
          alert("Receipt saved: ID " + json.mr_id);
          this.items = [];
          this.form.shipping_address = "";
          this.form.remark = "";
          this.lastReceiptId = json.mr_id;
        } else {
          alert("Error: " + JSON.stringify(json));
        }
      } catch (err) {
        alert("Failed to connect to server");
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchInitialData();
    this.form.receipt_date = this.formatDate(new Date());
  },
};
</script>

<style scoped>
.receipt-wrapper {
  max-width: 1200px;
  margin: 30px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.receipt-header {
  text-align: center;
  margin-bottom: 20px;
}

.receipt-header h1 {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 5px;
}

.receipt-header p {
  margin: 0;
  font-size: 16px;
  color: #555;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 25px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  display: block;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

table.receipt-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.receipt-table th,
.receipt-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.receipt-table th {
  background-color: #007bff;
  color: white;
  font-weight: 600;
}

.btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.summary {
  margin-top: 25px;
  text-align: right;
  font-weight: 600;
  font-size: 16px;
}

.btn-group-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}
</style>
