<template>
  <div class="dashboard-container">
    <h1 class="dashboard-title">Rice Mill Dashboard</h1>

    <section
      v-for="(section, index) in dashboardSections"
      :key="index"
      class="dashboard-section"
    >
      <h2 class="section-title">{{ section.title }}</h2>

      <div class="cards-container">
        <article v-for="(card, idx) in section.cards" :key="idx" class="card">
          <h3>{{ card.title }}</h3>
          <p>{{ card.content }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const dashboardSections = ref([
  {
    title: 'Production Overview',
    cards: [
      { title: "Today's Milling", content: '1,200 kg' },
      { title: 'Batch Processed', content: '6 Batches' },
      { title: 'Broken Rice Yield', content: '12%' },
      { title: 'Husk Output', content: '300 kg' },
    ],
  },
  {
    title: 'Sales Summary',
    cards: [
      { title: "Today's Sales", content: '৳50,000' },
      { title: 'Total Orders', content: '23' },
      { title: 'Pending Payments', content: '৳12,000' },
      { title: 'Top Buyer', content: 'Raju Traders' },
    ],
  },
  {
    title: 'Inventory Status',
    cards: [
      { title: 'Raw Paddy', content: '5,200 kg' },
      { title: 'Milled Rice', content: '2,400 kg' },
      { title: 'Bran Stock', content: '800 kg' },
      { title: 'Available Bags', content: '320' },
    ],
  },
  {
    title: 'Employee Stats',
    cards: [
      { title: 'Total Employees', content: '22' },
      { title: 'Shifts Today', content: '3' },
      { title: 'Bonuses Due', content: '৳7,500' },
      { title: 'Pending Attendance', content: '2' },
    ],
  },
  {
    title: 'Financial Reports',
    cards: [
      { title: 'Monthly Profit', content: '৳3,20,000' },
      { title: 'Expenses (This Month)', content: '৳1,25,000' },
      { title: 'Receivables', content: '৳80,000' },
      { title: 'Payables', content: '৳45,000' },
    ],
  },
  {
    title: 'Reports Summary',
    cards: [
      { title: 'Daily Reports', content: '5 Generated' },
      { title: 'Weekly Reports', content: '2 Completed' },
      { title: 'Stock Alerts', content: '3 Low Items' },
      { title: 'Quality Reports', content: 'All Passed' },
    ],
  },
  {
    title: 'Activity Logs',
    cards: [
      { title: 'User Login', content: 'Manager (10:45 AM)' },
      { title: 'New Order Placed', content: '#ORD-3241' },
      { title: 'Stock Updated', content: 'Milled Rice +400kg' },
      { title: 'Backup Created', content: 'Today at 2 PM' },
    ],
  },
])
</script>

<style scoped>
.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 40px;
  background: #f0f4f8;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;
  overflow-y: auto;
}

.dashboard-title {
  text-align: center;
  font-size: 44px;
  color: #0d6efd;
  margin-bottom: 60px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-shadow: 1px 1px 3px rgba(13, 110, 253, 0.4);
}

.dashboard-section {
  margin-bottom: 60px;
  background: #ffffff;
  padding: 35px 30px;
  border-radius: 15px;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.07);
  border: 1px solid #dde6f1; /* subtle light blue-gray border */
}

.section-title {
  font-size: 24px;
  color: #0d47a1; /* গাঢ় নীল */
  margin-bottom: 30px;
  border-bottom: 3px solid #0d6efd;
  padding-bottom: 12px;
  font-weight: 600;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 25px;
}

.card {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); 
  border-left: 6px solid #0d6efd;
  border-radius: 12px;
  padding: 22px 25px;
  box-shadow: 0 6px 15px rgba(13, 110, 253, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;
  color: #0b3d91;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(13, 110, 253, 0.35);
}

.card h3 {
  font-size: 18px;
  color: #0b3d91;
  margin-bottom: 14px;
  font-weight: 700;
}

.card p {
  font-size: 19px;
  color: #0d3c75;
  font-weight: 600;
  line-height: 1.3;
  user-select: text;
}






</style>
