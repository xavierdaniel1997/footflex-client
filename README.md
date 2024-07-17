import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MdDashboard, 
  MdInventory, 
  MdShoppingCart, 
  MdPeople, 
  MdBarChart, 
  MdLocalOffer, 
  MdCategory, 
  MdAdminPanelSettings, 
  MdSettings, 
  MdLogout 
} from 'react-icons/md';

const SideNavbar = () => {
  const navItems = [
    { icon: <MdDashboard />, text: "DASHBOARD", path: "/dashboard", active: false },
    { icon: <MdInventory />, text: "PRODUCTS", path: "/products", active: true },
    { icon: <MdShoppingCart />, text: "ORDERS", path: "/orders", active: false },
    { icon: <MdPeople />, text: "CUSTOMERS", path: "/customers", active: false },
    { icon: <MdBarChart />, text: "SALES REPORT", path: "/sales-report", active: false },
    { icon: <MdLocalOffer />, text: "COUPONS", path: "/coupons", active: false },
    { icon: <MdCategory />, text: "CATEGORY", path: "/category", active: false },
    { icon: <MdAdminPanelSettings />, text: "ADMIN", path: "/admin", active: false },
    { icon: <MdSettings />, text: "SETTINGS", path: "/settings", active: false },
  ];

  return (
    <nav className="bg-white w-64 h-screen shadow-lg flex flex-col justify-between">
      <div>
        <div className="p-4 border-b border-gray-200 flex justify-center items-center">
          <h1 className="text-2xl font-bold">FOOTFLEX</h1>
        </div>
        <ul>
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <li
                className={`px-4 py-3 flex items-center space-x-3 cursor-pointer ${
                  item.active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center">
          <MdLogout className="mr-2" />
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default SideNavbar;











import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideNavbar from './components/SideNavbar';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import SalesReport from './pages/SalesReport';
import Coupons from './pages/Coupons';
import Category from './pages/Category';
import Admin from './pages/Admin';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <SideNavbar />
        <div className="flex-grow">
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/products" component={Products} />
            <Route path="/orders" component={Orders} />
            <Route path="/customers" component={Customers} />
            <Route path="/sales-report" component={SalesReport} />
            <Route path="/coupons" component={Coupons} />
            <Route path="/category" component={Category} />
            <Route path="/admin" component={Admin} />
            <Route path="/settings" component={Settings} />
            {/* Add more routes as needed */}
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
