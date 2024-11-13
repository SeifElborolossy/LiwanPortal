import { useState } from "react";
// ShadCN Components
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// Lucide Icons
import { CalendarIcon, Filter } from "lucide-react";
// Custom Components
import Widgets from "./Widgets";
import TableRowComponent from "./TableRowComponent";


export default function OrderHistory() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState("");
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });

  const orders = [
    {
      id: "ORD-001",
      user: "John Doe",
      orderName: "Product A",
      orderDescription:
        "This is a detailed description of Product A. It includes all the specifications and features that make this product unique and valuable to the customer.",
      status: "Pending",
      date: "2023-06-10 14:30:00",
      pricing: 374.96,
      method: "Credit Card",
    },
    {
      id: "ORD-002",
      user: "Jane Smith",
      orderName: "Product B",
      orderDescription:
        "Product B is our premium offering. This description elaborates on its high-quality materials, superior craftsmanship, and the exceptional value it provides to discerning customers.",
      status: "Completed",
      date: "2023-06-09 10:15:00",
      pricing: 562.46,
      method: "Bank Transfer",
    },
    {
      id: "ORD-003",
      user: "Bob Johnson",
      orderName: "Product C",
      orderDescription:
        "Product C is designed for efficiency and practicality. This description details its user-friendly features, durability, and how it can improve daily tasks for our customers.",
      status: "Cancelled",
      date: "2023-06-08 16:45:00",
      pricing: 299.96,
      method: "Cash",
    },
    {
      id: "ORD-004",
      user: "Alice Brown",
      orderName: "Product D",
      orderDescription:
        "Product D represents innovation in its category. This description highlights its cutting-edge technology, sleek design, and the transformative impact it can have on user experience.",
      status: "Work In Progress",
      date: "2023-06-11 09:00:00",
      pricing: 749.96,
      method: "Credit Card",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.user.toLowerCase().includes(search.toLowerCase()) ||
      order.orderName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter.length === 0 || statusFilter.includes(order.status);
    const matchesPrice =
      (minPrice === "" || order.pricing >= parseFloat(minPrice)) &&
      (maxPrice === "" || order.pricing <= parseFloat(maxPrice));
    const orderDate = new Date(order.date);
    const matchesDate =
      (!dateRange.from || orderDate >= dateRange.from) &&
      (!dateRange.to || orderDate <= dateRange.to);

    return matchesSearch && matchesStatus && matchesPrice && matchesDate;
  });

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto py-10 w-full min-h-screen">

      <div className="content container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-2">Orders History</h1>
        <p className="text-gray-600 mb-6">
          In this order details section, you can review and manage all orders
          with their details. You can view and edit any order. Access to this
          area is limited. Only administrators and managers can reach. The
          changes you will make will be approved after they are checked.
        </p>
        <Widgets statusCounts={statusCounts} />
        <div className="grid md:grid-cols-3 items-center mb-4">
          <Input
            className="max-w-sm mb-2"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {["Pending", "Completed", "Cancelled", "Work In Progress"].map(
                  (status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={statusFilter.includes(status)}
                      onCheckedChange={(checked) =>
                        setStatusFilter(
                          checked
                            ? [...statusFilter, status]
                            : statusFilter.filter((s) => s !== status)
                        )
                      }
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Price
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-col space-y-2">
                  <Input
                    placeholder="Min Price"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <Input
                    placeholder="Max Price"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Filter Date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Order ID</TableHead>
                <TableHead className="text-center">Employee</TableHead>
                <TableHead className="text-center">Order Name</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Pricing</TableHead>
                <TableHead className="text-center">Method</TableHead>
                <TableHead className="text-center">Order Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRowComponent key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
