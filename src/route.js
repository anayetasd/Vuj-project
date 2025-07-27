
import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from './Layouts/MainLayout.vue';

import Dashboard from './pages/Dashboard.vue';
import Summary from './pages/Summary.vue';

import Index from './pages/purchases/index.vue';
import Create from './pages/purchases/create.vue';
import Edit from './pages/purchases/edit.vue';
import Show from './pages/purchases/show.vue';
import Delete from './pages/purchases/delete.vue';


import Supplier from './pages/Supplier/index.vue';
import SupplierCreate from './pages/Supplier/create.vue';
import SupplierEdit from './pages/Supplier/edit.vue';
import SupplierShow from './pages/Supplier/show.vue';
import SupplierDelete from './pages/Supplier/delete.vue';

import IndexRawMaterials from './pages/Inventory/RawMaterial/index.vue';
import CreateRawMaterials from './pages/Inventory/RawMaterial/create.vue';
import RawMaterialConfirm from './pages/Inventory/RawMaterial/delete.vue';
import EditRawMaterials from './pages/Inventory/RawMaterial/edit.vue';
import ShowRawMaterials from './pages/Inventory/RawMaterial/show.vue';

import IndexFinishedGoods from './pages/Inventory/FinishedGoods/index.vue';
import ShowFinishedGoods from './pages/Inventory/FinishedGoods/show.vue';
import EditFinishedGoods from './pages/Inventory/FinishedGoods/edit.vue';
import CreateFinishedGoods from './pages/Inventory/FinishedGoods/create.vue';
import DeleteFinishedGoods from './pages/Inventory/FinishedGoods/delete.vue';

import IndexCustomers from './pages/Customer/index.vue';
import CreateCustomers from './pages/Customer/create.vue';
import ShowCustomers from './pages/Customer/show.vue';
import EditCustomers from './pages/Customer/edit.vue';
import DeleteCustomers from './pages/Customer/delete.vue';

import IndexOrder from './pages/Order/index.vue';
import CreateOrder from './pages/Order/create.vue';
import ShowOrder from './pages/Order/show.vue';
import EditOrder from './pages/Order/edit.vue';
import DeleteOrder from './pages/Order/delete.vue';

import IndexProductions from './pages/Production/index.vue';
import CreateProductions from './pages/Production/create.vue';
import ShowProductions from './pages/Production/show.vue';
import EditProductions from './pages/Production/edit.vue';
import DeleteProductions from './pages/Production/delete.vue';

import IndexProducts from './pages/Product/index.vue';
import CreateProducts from './pages/Product/create.vue';
import ShowProducts from './pages/Product/show.vue';
import EditProducts from './pages/Product/edit.vue';
import DeleteProducts from './pages/Product/delete.vue';

import IndexStocks from './pages/Stock/index.vue';
import CreateStocks from './pages/Stock/create.vue';
import ShowStocks from './pages/Stock/show.vue';
import EditStocks from './pages/Stock/edit.vue';
import DeleteStocks from './pages/Stock/delete.vue';


import IndexSales from './pages/Sales/index.vue';
import CreateSales from './pages/Sales/create.vue';
import ShowSales from './pages/Sales/show.vue';
import EditSales from './pages/Sales/edit.vue';
import DeleteSales from './pages/Sales/delete.vue';


import IndexMR from './pages/Accounts/MR/index.vue';
import CreateMR from './pages/Accounts/MR/create.vue';
import ShowMR from './pages/Accounts/MR/show.vue';
import EditMR from './pages/Accounts/MR/edit.vue';
import DeleteMR from './pages/Accounts/MR/delete.vue';

import IndexEmployee from './pages/HR/Employee/index.vue';
import CreateEmployee from './pages/HR/Employee/create.vue';
import ShowEmployee from './pages/HR/Employee/show.vue';
import EditEmployee from './pages/HR/Employee/edit.vue';
import DeleteEmployee from './pages/HR/Employee/delete.vue';

import IndexEmployeeSalary from './pages/HR/EmployeeSalary/index.vue';
import CreateEmployeeSalary from './pages/HR/EmployeeSalary/create.vue';
import ShowEmployeeSalary from './pages/HR/EmployeeSalary/show.vue';
import EditEmployeeSalary from './pages/HR/EmployeeSalary/edit.vue';
import DeleteEmployeeSalary from './pages/HR/EmployeeSalary/delete.vue';

// const routes = [
//   { path:'/', component: Dashboard },
//   { path: '/purchases', component: Index },
  

// ]

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [

      {path: '',component: Dashboard},
      {path: 'summary',component: Summary},

      {path: 'purchases',component: Index},
      {path: 'purchases/create',component: Create},
      {path: 'purchases/:id/edit',component: Edit},
      {path: 'purchases/:id',component: Show},
      {path: 'purchases/delete/:id',component: Delete},

      {path: 'suppliers',component: Supplier},
      {path: 'suppliers/create',component: SupplierCreate},
      {path: 'suppliers/:id/edit',component: SupplierEdit},
      {path: 'suppliers/:id',component: SupplierShow},
      {path: 'suppliers/delete/:id',component: SupplierDelete},

      {path: 'rawmaterials',component: IndexRawMaterials},
      {path: 'rawmaterials/create',component: CreateRawMaterials},
      {path: 'rawmaterials/:id/edit',component: EditRawMaterials},
      {path: 'rawmaterials/:id',component: ShowRawMaterials},
      {path: 'rawmaterials/delete/:id',component: RawMaterialConfirm},

      {path: 'finishedgoods',component: IndexFinishedGoods},
      {path: 'finishedgoods/:id',component: ShowFinishedGoods},
      {path: 'finishedgoods/:id/edit',component: EditFinishedGoods},
      {path: 'finishedgoods/create',component: CreateFinishedGoods},
      {path: 'finishedgoods/delete/:id',component: DeleteFinishedGoods},

      {path: 'customers',component: IndexCustomers},
      {path: 'customers/create',component: CreateCustomers},
      {path: 'customers/:id',component: ShowCustomers},
      {path: 'customers/:id/edit',component: EditCustomers},
      {path: 'customers/:id/confirm',component: DeleteCustomers},


      {path: 'orders',component: IndexOrder},
      {path: 'orders/create',component: CreateOrder},
      {path: 'orders/:id',component: ShowOrder},
      {path: 'orders/:id/edit',component: EditOrder},
      {path: 'orders/delete/:id',component: DeleteOrder},

      {path: 'productions',component: IndexProductions},
      {path: 'productions/create',component: CreateProductions},
      {path: 'productions/:id',component: ShowProductions},
      {path: 'productions/:id/edit',component: EditProductions},
      {path: 'productions/delete/:id',component: DeleteProductions},


      {path: 'products',component: IndexProducts},
      {path: 'products/create',component: CreateProducts},
      {path: 'products/:id',component: ShowProducts},
      {path: 'products/:id/edit',component: EditProducts},
      {path: 'products/:id/confirm', component: DeleteProducts},

      {path: 'stocks',component: IndexStocks},
      {path: 'stocks/create',component: CreateStocks},
      {path: 'stocks/:id',component: ShowStocks},
      {path: 'stocks/:id/edit',component: EditStocks},
      {path: 'stocks/delete/:id',component: DeleteStocks},

      {path: 'sales',component: IndexSales},
      {path: 'sales/create',component: CreateSales},
      {path: 'sales/:id',component: ShowSales},
      {path: 'sales/:id/edit',component: EditSales},
      {path: 'sales/delete/:id',component: DeleteSales},

      {path: 'mrs',component: IndexMR},
      {path: 'mrs/create',component: CreateMR},
      {path: 'mrs/:id',component: ShowMR},
      {path: 'mrs/:id/edit',component: EditMR},
      {path: 'mrs/delete/:id',component: DeleteMR},

      {path: 'employees',component: IndexEmployee},
      {path: 'employees/create',component: CreateEmployee},
      {path: 'employees/:id',component: ShowEmployee},
      {path: 'employees/:id/edit',component: EditEmployee},
      {path: 'employees/delete/:id',component: DeleteEmployee},

      {path: 'employeesalarys',component: IndexEmployeeSalary},
      {path: 'employeesalarys/create',component: CreateEmployeeSalary},
      {path: 'employeesalarys/:id',component: ShowEmployeeSalary},
      {path: 'employeesalarys/:id/edit',component: EditEmployeeSalary},
      {path: 'employeesalarys/delete/:id',component: DeleteEmployeeSalary},
        
        
        
        
    ],
  },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router



