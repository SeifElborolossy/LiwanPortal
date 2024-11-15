import { Plane, FileText, HelpCircle, Heart, Truck, CreditCard, 
  Package, BarChart2, Users, Smartphone, 
  Ticket,
  BadgeDollarSign} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LiwanPortal = () => {
const portalItems = [
  { name: 'Order Approval', icon: BarChart2, link: '/order-approval',},
  { name: 'Order History', icon: Plane, link: '/order-history' ,},
  { name: 'Order Details', icon: FileText, link: '/order-details' },
  { name: 'Submit Order', icon: BadgeDollarSign, link: '/submit-order' },
  { name: 'Schedule', icon: HelpCircle, link: '/schedule' },
  { name: 'Social Marketing', icon: Heart, link: '/social-marketing' },
  { name: 'Delivery', icon: Truck, link: '/delivery' },
  { name: 'Inventory', icon: Package, link: '/inventory' },
  { name: 'Profiles', icon: Users, link: '/login-page' },
  { name: 'Signatures History', icon: Smartphone, link: '/signatures-history' },
  { name: 'Payments', icon: CreditCard, link: '/payments' },
  { name: 'Submit Ticket', icon: Ticket, link: 'https://liwan-back-and-front-main-sigma.vercel.app/' },
];

return (
<div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
<h1 className="mb-8 text-6xl font-bold pb-28 text-[#d4ab71]">Liwan Portal</h1>
<div className="grid grid-cols-3 gap-8 md:grid-cols-6">
 {portalItems.map((item, index) => {
   const IconComponent = item.icon;
   return (
     <Link className="p-2" key={index} to={item.link}>
       <Button  
         className="flex h-28 w-28 flex-col items-center justify-center gap-2 p-4 rounded-lg text-[#d4ab71] hover:bg-[#d4ab71] hover:text-black font-semibold hover:font-bold bg-stone-100 dark:bg-slate-700 dark:hover:bg-[#d4ab71] shadow-2xl dark:shadow-slate-800 shadow-black/30"
       >
         <IconComponent className="dark:text-[#BCC3D5] text-[#67768B]" />
         <span className="text-xs text-center">{item.name}</span>
       </Button>
     </Link>
   );
 })}
</div>
</div>
);
};

export default LiwanPortal;