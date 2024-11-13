import { Plane, FileText, HelpCircle, Heart, Truck, CreditCard, 
  Package, Factory, BarChart2, Users, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LiwanPortal = () => {
const portalItems = [
  { name: 'Order History', icon: Plane, link: '/order-history' ,},
  { name: 'Purchase Order', icon: FileText, link: '/order-details' },
  { name: 'Submit Order', icon: HelpCircle, link: '/submit-order' },
  { name: 'Schedule', icon: HelpCircle, link: '/schedule' },
  { name: 'Health', icon: Heart, link: '/health' },
  { name: 'Social Marketing', icon: Heart, link: '/social-marketing' },
  { name: 'Delivery', icon: Truck, link: '/delivery' },
  { name: 'Inventory', icon: Package, link: '/inventory' },
  { name: 'Manufacturing', icon: Factory, link: '/manufacturing' },
  { name: 'Sales', icon: BarChart2, link: '/sales' },
  { name: 'Profiles', icon: Users, link: '/profiles' },
  { name: 'Dashboard', icon: Smartphone, link: '/dashboard' },
  { name: 'Payments', icon: CreditCard, link: '/payments' },
];

return (
<div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
<h1 className="mb-8 text-6xl font-bold pb-28">Liwan Portal</h1>
<div className="grid grid-cols-3 gap-8 md:grid-cols-6">
 {portalItems.map((item, index) => {
   const IconComponent = item.icon;
   return (
     <Link className="p-2" key={index} to={item.link}>
       <Button
         variant="outline"
         className="flex h-28 w-28 flex-col items-center justify-center gap-2 p-4 hover:bg-[#d4ab71] "
       >
         <IconComponent className="h-8 w-8" />
         <span className="text-xs text-center ">{item.name}</span>
       </Button>
     </Link>
   );
 })}
</div>
</div>
);
};

export default LiwanPortal;