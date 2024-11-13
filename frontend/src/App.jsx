import OrderDetails from "./pages/Order Details/OrderDetails";
import OrderHistory from "./pages/Order History/OrderHistory";
import LiwanPortal from "./pages/Main Page/LiwanPortal";
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import { Fragment} from 'react';
import EditOrder from './pages/EditOrder/EditOrder';
import ThemeSwitcher from "./components/ui/ThemeSwitcher";




const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <ThemeSwitcher/>
        <Routes>
            <Route exact path="/" element= {<LiwanPortal/>}/>
            <Route exact path="/order-history" element= {<OrderHistory/>}/>
            <Route exact path="/order-details" element= {<OrderDetails/>}/>
            <Route exact path="/edit-order" element= {<EditOrder/>}/>
        </Routes>
      </Fragment>        
    </BrowserRouter>
  );
};

export default App;
