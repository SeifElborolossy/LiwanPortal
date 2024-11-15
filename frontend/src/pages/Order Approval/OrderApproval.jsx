'use client'

import  { useState } from 'react'
import { CalendarIcon, CreditCard, Package, Search, Users } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const priorityColors = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
  "Very Low": "bg-blue-500",
}

// eslint-disable-next-line react/prop-types
function OrderApproval({ priority }) {
  return (
    <Badge className={`${priorityColors[priority]} text-white`}>
      {priority}
    </Badge>
  )
}

const dummyOrders = [
  {
    orderId: "ORD-12345",
    orderTitle: "Ergonomic Office Chair",
    orderDescription: "High-quality ergonomic office chair with advanced features for maximum comfort and productivity.",
    orderingPerson: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
    orderCustomer: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    price: 299.99,
    paymentMethod: "Credit Card",
    dateCreated: new Date("2023-06-15T10:30:00"),
    deliveryDate: new Date("2023-06-25T14:00:00"),
    orderPriority: "Critical",
  },
  {
    orderId: "ORD-67890",
    orderTitle: "Wireless Noise-Cancelling Headphones",
    orderDescription: "Premium wireless headphones with active noise cancellation for immersive audio experience.",
    orderingPerson: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
    },
    orderCustomer: {
      name: "Bob Williams",
      email: "bob.williams@example.com",
    },
    price: 249.99,
    paymentMethod: "PayPal",
    dateCreated: new Date("2023-06-16T09:15:00"),
    deliveryDate: new Date("2023-06-26T11:00:00"),
    orderPriority: "High",
  },
  {
    orderId: "ORD-24680",
    orderTitle: "Smart Home Security System",
    orderDescription: "Comprehensive smart home security system with cameras, sensors, and mobile app integration.",
    orderingPerson: {
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
    },
    orderCustomer: {
      name: "Diana Evans",
      email: "diana.evans@example.com",
    },
    price: 499.99,
    paymentMethod: "Bank Transfer",
    dateCreated: new Date("2023-06-17T14:45:00"),
    deliveryDate: new Date("2023-06-27T16:00:00"),
    orderPriority: "Medium",
  },
]

export default function Component() {
  // eslint-disable-next-line no-unused-vars
  const [orders, setOrders] = useState(dummyOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("dateCreated")
  const [filterPriority, setFilterPriority] = useState("all")

  const handleApprove = (orderId) => {
    // Implement approve logic here
    console.log(`Approved order: ${orderId}`)
  }

  const handleDecline = (orderId) => {
    // Implement decline logic here
    console.log(`Declined order: ${orderId}`)
  }

  const filteredAndSortedOrders = orders
    .filter(order => 
      (order.orderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterPriority === "all" || order.orderPriority === filterPriority)
    )
    .sort((a, b) => {
      if (sortBy === "dateCreated") {
        return b.dateCreated.getTime() - a.dateCreated.getTime()
      } else if (sortBy === "price") {
        return b.price - a.price
      } else {
        return 0
      }
    })

  return (
    <div className="container mx-auto p-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Orders Awaiting Approval</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dateCreated">Date Created</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Very Low">Very Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredAndSortedOrders.map((order) => (
          <Card key={order.orderId} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{order.orderTitle}</span>
                <OrderApproval priority={order.orderPriority} />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4">{order.orderDescription}</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">{order.orderId}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">{order.orderingPerson.name}</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span className="text-sm">SAR {order.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span className="text-sm">{order.dateCreated.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleApprove(order.orderId)}>Approve</Button>
              <Button variant="destructive" onClick={() => handleDecline(order.orderId)}>Decline</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}