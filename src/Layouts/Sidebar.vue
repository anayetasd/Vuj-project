
    <script setup>
        import { onMounted } from 'vue'
        

        onMounted(() => {
        const menuItems = document.querySelectorAll('#menu > li > a.has-arrow');

        menuItems.forEach((menu) => {
            menu.addEventListener('click', function (e) {
            e.preventDefault();

            const parentLi = this.parentElement;

            const allSubMenus = document.querySelectorAll('#menu > li');
            allSubMenus.forEach((li) => {
                if (li !== parentLi) {
                li.classList.remove('mm-active');
                const ul = li.querySelector('ul');
                if (ul) ul.style.display = 'none';
                }
            });

            parentLi.classList.toggle('mm-active');
            const subMenu = parentLi.querySelector('ul');
            if (subMenu) {
                subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
            }
            });
        });
        })

        jQuery(document).ready(function($) {
        $(".nav-control").on("click", function () {
            $("#main-wrapper").toggleClass("menu-toggle");
            $(".hamburger").toggleClass("is-active");
        });
        });




    </script>



    <template>
        <div class="dlabnav">
                <div class="dlabnav-scroll">
                    <ul class="metismenu" id="menu">
                        <li class="nav-label first">Main Menu</li>
                        <li>
                            <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-home"></i>
                                <span class="nav-text">Dashboard</span>

                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <router-link to="/summary" class="nav-link">
                                        Sumary
                                    </router-link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-user"></i>
                                <span class="nav-text">Purchases</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <router-link to="/purchases/create" class="nav-link">
                                        Create Purchases
                                    </router-link>
                                   
                                </li>

                                <li>
                                    <router-link to="/purchases" class="nav-link">
                                        Purchases List
                                    </router-link>
                                    
                                </li>

                            </ul>
                        </li>

                        <li>
                            <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-users"></i>
                                <span class="nav-text">Supplier Management</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <router-link to="/suppliers/create" class="nav-link">
                                        Create Supplier
                                    </router-link>
                                </li>
                               

                                <li>
                                    <router-link to="/suppliers" class="nav-link">
                                        Manage Supplier
                                    </router-link>
                                </li>
                                

                            </ul>
                        </li>

                        <li>
                            <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-graduation-cap"></i>
                                <span class="nav-text">Inventory Management</span>
                            </a>
                            <ul aria-expanded="false">

                                <li>
                                    <router-link to="/rawmaterials/create" class="nav-link">
                                        Create Raw-Material
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/rawmaterials" class="nav-link">
                                        Manage Raw-Material
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/finishedgoods/create" class="nav-link">
                                        Create Finished-Goods
                                    </router-link>

                                </li>
                                <li>
                                    <router-link to="/finishedgoods" class="nav-link">
                                        Manage Finished-Goods
                                    </router-link>
                                </li>

                            </ul>

                        </li>

                        <li>
                            <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-book"></i>
                                <span class="nav-text">Productions</span>
                            </a>
                            <ul aria-expanded="false">

                                <li>
                                   <router-link to="/productions/create" class="nav-link">
                                        Create Productions
                                    </router-link>
                                </li>

                                <li>
                                    <router-link to="/productions" class="nav-link">
                                        Manage Productions
                                    </router-link>
                                </li>

                                <li>
                                    <router-link to="/products/create" class="nav-link">
                                       Create Product
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/products" class="nav-link">
                                      Manage Product
                                    </router-link>
                                </li>
                                
                            </ul>
                        </li>

                        <li>
                            <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-building"></i>
                                <span class="nav-text">Stock Management</span>
                            </a>
                            <ul aria-expanded="false">

                                <li>
                                    <router-link to="/stocks/create" class="nav-link">
                                     Create Stock
                                    </router-link>
                                </li>

                                <li>
                                    <router-link to="/stocks" class="nav-link">
                                      Manage Stock
                                    </router-link>
                                </li>
                              

                            </ul>
                        </li>

                        <li>
                            <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-users"></i>
                                <span class="nav-text">Order Management</span>
                            </a>
                            <ul aria-expanded="false">

                                <li>
                                    <router-link to="/orders/create" class="nav-link">
                                     Create Order
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/orders" class="nav-link">
                                      Manage Order
                                    </router-link>
                                </li>
                               
                            </ul>
                        </li>

                        <li>
                            <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-gift"></i>
                                <span class="nav-text">Customer Management</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <router-link to="/customers/create" class="nav-link">
                                      Create Customer
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/customers" class="nav-link">
                                      Manage Customer
                                    </router-link>
                                </li>
                               
                            </ul>
                        </li>

                        <li>
                            <a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-dollar"></i>
                                <span class="nav-text">Sales Management</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <router-link to="/sales/create" class="nav-link">
                                     Create Sales
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/sales" class="nav-link">
                                      Manage Sales
                                    </router-link>
                                </li>
                            </ul>
                        </li>	

                      

                    
                        <li>
                            <a class="has-arrow ai-icon" href="javascript:void()" aria-expanded="false">
                                <i class="la la-signal"></i>
                                <span class="nav-text">Accounts</span>
                            </a>
                            <ul aria-expanded="false">

                                <li>
                                    <router-link to="/mrs/create" class="nav-link">
                                     Create Money-Received
                                    </router-link>
                                </li>

                                <li>
                                    <router-link to="/mrs" class="nav-link">
                                     Manage Money-Received
                                    </router-link>
                                </li>
                            </ul>
                        </li>



                        <li><a class="has-arrow" href="javascript:void()" aria-expanded="false">
                                <i class="la la-plus-square-o"></i>
                                <span class="nav-text">HR & Payroll</span>
                            </a>
                            <ul aria-expanded="false">
                                <li>
                                    <router-link to="/employees/create" class="nav-link">
                                        Add New Employee
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/employees" class="nav-link">
                                       Employee List
                                    </router-link>
                                </li>

                                <li>
                                    <router-link to="/employeesalarys/create" class="nav-link">
                                        Add Payment Salary
                                    </router-link>
                                </li>

                               <li>
                                    <router-link to="/employeesalarys" class="nav-link">
                                        List Payment Salary
                                    </router-link>
                                </li>
                               
                            </ul>
                        </li>

                        <li>
                            <a href="widget-basic.html" aria-expanded="false">
                                <i class="la la-desktop"></i>
                                <span class="nav-text">Logout</span>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </div>
    </template>

 <style scoped>

            #menu li ul {
            display: none;
            padding-left: 20px;
            transition: all 0.3s ease;
            }

            #menu li.mm-active > ul {
            display: block;
            }

            #menu li > a.has-arrow::after {
            
            float: right;
            transition: transform 0.3s;
            }

            #menu li.mm-active > a.has-arrow::after {
            transform: rotate(45deg);
            }





            /* sidebar বন্ধ থাকার সময় */
            #main-wrapper.menu-toggle .dlabnav {
            left: -300px; 
            }

            /* hamburger animation (optional) */
            .hamburger.is-active .line:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
            }
            .hamburger.is-active .line:nth-child(2) {
            opacity: 0;
            }
            .hamburger.is-active .line:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
            }

            /* scroll er jonno */

            

            .dlabnav-scroll {
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            padding-bottom: 50px;
            scrollbar-width: thin;        
            scrollbar-color: #198754 #f0f0f0;
            }

           
            .dlabnav-scroll::-webkit-scrollbar {
            width: 6px;
            }
            .dlabnav-scroll::-webkit-scrollbar-thumb {
            background-color: #198754;
            border-radius: 10px;
            }
            .dlabnav-scroll::-webkit-scrollbar-track {
            background: #f0f0f0;
            }


                
    
    
    </style>