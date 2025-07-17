<template>
  <div class="container my-5">
    <h1 class="text-center mb-5">📊 Rice Mill Management Summary</h1>

    <!-- Summary Cards -->
    <div class="row g-4">
      <div
        class="col-md-4"
        v-for="(card, index) in summaryCards"
        :key="index"
      >
        <div :class="`card text-white bg-${card.bg} shadow`">
          <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p class="card-text fs-3 fw-bold">{{ card.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Yearly Summary -->
    <div class="mt-5">
      <h4>📅 Yearly Summary - {{ yearly.year }}</h4>
      <ul class="list-group">
        <li class="list-group-item">Total Purchase: {{ yearly.total_purchase }} ৳</li>
        <li class="list-group-item">Total Sales: {{ yearly.total_sales }} ৳</li>
        <li class="list-group-item">Total Expense: {{ yearly.total_expense }} ৳</li>
        <li class="list-group-item">Net Profit: {{ yearly.profit }} ৳</li>
      </ul>
    </div>

    <!-- Monthly Breakdown -->
    <div class="mt-5">
      <h4>📆 Monthly Report</h4>
      <div class="table-responsive">
        <table class="table table-bordered table-striped text-center align-middle">
          <thead class="table-dark">
            <tr>
              <th>Month</th>
              <th>Purchase (৳)</th>
              <th>Sales (৳)</th>
              <th>Expense (৳)</th>
              <th>Profit (৳)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(month, index) in monthly" :key="index">
              <td>{{ month.name }}</td>
              <td>{{ month.purchase }}</td>
              <td>{{ month.sales }}</td>
              <td>{{ month.expense }}</td>
              <td>{{ month.profit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

   
  </div>
</template>

<script setup>
const summaryCards = [
  { title: 'Total Purchases', value: '2,50,000 ৳', bg: 'primary' },
  { title: 'Total Sales', value: '3,40,000 ৳', bg: 'success' },
  { title: 'Current Stock (kg)', value: '15,000', bg: 'warning' },
  { title: 'Employees', value: '22', bg: 'info' },
  { title: 'Total Expenses', value: '95,000 ৳', bg: 'danger' },
  { title: 'Net Profit', value: '45,000 ৳', bg: 'dark' },
]

const yearly = {
  year: 2025,
  total_purchase: '25,00,000',
  total_sales: '34,50,000',
  total_expense: '10,00,000',
  profit: '24,50,000'
}

const monthly = [
  { name: 'January', purchase: 200000, sales: 300000, expense: 100000, profit: 200000 },
  { name: 'February', purchase: 220000, sales: 280000, expense: 90000, profit: 190000 },
  { name: 'March', purchase: 180000, sales: 260000, expense: 85000, profit: 175000 },
  { name: 'April', purchase: 240000, sales: 310000, expense: 110000, profit: 200000 },
  { name: 'May', purchase: 210000, sales: 290000, expense: 95000, profit: 195000 },
  { name: 'June', purchase: 230000, sales: 320000, expense: 105000, profit: 215000 },
  { name: 'July', purchase: 250000, sales: 340000, expense: 100000, profit: 240000 },
  { name: 'August', purchase: 240000, sales: 330000, expense: 95000, profit: 235000 },
  { name: 'September', purchase: 260000, sales: 350000, expense: 98000, profit: 252000 },
  { name: 'October', purchase: 220000, sales: 300000, expense: 87000, profit: 213000 },
  { name: 'November', purchase: 210000, sales: 290000, expense: 92000, profit: 198000 },
  { name: 'December', purchase: 280000, sales: 360000, expense: 100000, profit: 260000 },
]
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
