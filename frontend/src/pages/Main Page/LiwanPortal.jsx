import { Plane, FileText, HelpCircle, Heart, Truck, CreditCard, 
  Package, Factory, BarChart2, Users, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "../../components/ui/ThemeSwitcher";
import { Link } from "react-router-dom";

const LiwanPortal = () => {
const portalItems = [
  { name: 'Maintenance', icon: Plane, link: '/maintenance' ,},
  { name: 'Purchase Order', icon: FileText, link: '/order-details' }, 
  { name: 'Help Desk', icon: HelpCircle, link: '/help-desk' },
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
<ThemeSwitcher/>
<h1 className="mb-8 text-4xl font-bold">Liwan Portal</h1>
<div className="grid grid-cols-3 gap-8 md:grid-cols-6">
 {portalItems.map((item, index) => {
   const IconComponent = item.icon;
   return (
     <Link key={index} to={item.link}>
       <Button
         variant="outline"
         className="flex h-24 w-24 flex-col items-center justify-center gap-2 p-4 hover:bg-[#d4ab71]"
       >
         <IconComponent className="h-8 w-8" />
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