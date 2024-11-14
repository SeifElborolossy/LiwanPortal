'use client'

import { useState } from 'react'
import { CalendarIcon, FileText, Package, Trash2, Users } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


const priorityColors = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
  "Very Low": "bg-blue-500",
}

const statusColors = {
  Pending: "bg-yellow-500",
  Cancelled: "bg-red-500",
  Completed: "bg-green-500",
  "Work In Process": "bg-blue-500",
}

// eslint-disable-next-line react/prop-types
function StatusBadge({ status, onChange }) {
  return (
    <div>
      <Select onValueChange={onChange} defaultValue={status}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(statusColors).map((s) => (
            <SelectItem key={s} value={s}>
              <Badge className={`${statusColors[s]} text-white`}>{s}</Badge>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function PriorityBadge({ priority, onChange }) {
  return (
    <Select onValueChange={onChange} defaultValue={priority}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select priority" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(priorityColors).map((p) => (
          <SelectItem key={p} value={p}>
            <Badge className={`${priorityColors[p]} text-white`}>{p}</Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default function EditOrderPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [orderDetails, setOrderDetails] = useState({
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
    deliveryStatus: "Pending",
    paymentMethod: "Credit Card",
    orderDetails: "Custom-made ergonomic office chair with lumbar support and adjustable armrests. Color: Midnight Blue.",
    dateCreated: new Date("2023-06-15T10:30:00"),
    deliveryDate: new Date("2023-06-25T14:00:00"),
    attachments: ["https://example.com/order-12345-invoice.pdf", "https://example.com/order-12345-design-specs.pdf"],
    orderPriority: "Critical",
  })

  const handleInputChange = (e, field) => {
    setOrderDetails(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleNestedInputChange = (e, parent, field) => {
    setOrderDetails(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: e.target.value }
    }))
  }

  const handleDeleteOrder = () => {
    console.log("Order deleted")
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Order Details</h1>
        <div className="space-x-2">
          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Order
          </Button>
        </div>
      </header>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Order Title:</h3>
            <Input 
              value={orderDetails.orderTitle} 
              onChange={(e) => handleInputChange(e, 'orderTitle')} 
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Description:</h3>
            <Textarea 
              value={orderDetails.orderDescription} 
              onChange={(e) => handleInputChange(e, 'orderDescription')} 
            />
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Order ID:</span>
              <Input 
                value={orderDetails.orderId} 
                onChange={(e) => handleInputChange(e, 'orderId')} 
                className="w-2/3"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Price:</span>
              <Input 
                type="number"
                value={orderDetails.price} 
                onChange={(e) => handleInputChange(e, 'price')} 
                className="w-2/3"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Status:</span>
              <StatusBadge 
                status={orderDetails.deliveryStatus} 
                onChange={(value) => setOrderDetails(prev => ({ ...prev, deliveryStatus: value }))}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Priority:</span>
              <PriorityBadge 
                priority={orderDetails.orderPriority} 
                onChange={(value) => setOrderDetails(prev => ({ ...prev, orderPriority: value }))}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Payment Method:</span>
              <Input 
                value={orderDetails.paymentMethod} 
                onChange={(e) => handleInputChange(e, 'paymentMethod')} 
                className="w-2/3"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              People
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Ordering Employee:</h3>
              <div className="bg-muted p-3 rounded-md space-y-2">
                <Input 
                  value={orderDetails.orderingPerson.name} 
                  onChange={(e) => handleNestedInputChange(e, 'orderingPerson', 'name')} 
                  placeholder="Name"
                />
                <Input 
                  value={orderDetails.orderingPerson.email} 
                  onChange={(e) => handleNestedInputChange(e, 'orderingPerson', 'email')} 
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ordering Customer:</h3>
              <div className="bg-muted p-3 rounded-md space-y-2">
                <Input 
                  value={orderDetails.orderCustomer.name} 
                  onChange={(e) => handleNestedInputChange(e, 'orderCustomer', 'name')} 
                  placeholder="Name"
                />
                <Input 
                  value={orderDetails.orderCustomer.email} 
                  onChange={(e) => handleNestedInputChange(e, 'orderCustomer', 'email')} 
                  placeholder="Email"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Order Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Order Title:</h3>
            <Input 
              value={orderDetails.orderTitle} 
              onChange={(e) => handleInputChange(e, 'orderTitle')} 
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Description:</h3>
            <Textarea 
              value={orderDetails.orderDescription} 
              onChange={(e) => handleInputChange(e, 'orderDescription')} 
            />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Additional Details:</h3>
            <Textarea 
              value={orderDetails.orderDetails} 
              onChange={(e) => handleInputChange(e, 'orderDetails')} 
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Date Created:</span>
              <Input 
                type="datetime-local"
                value={orderDetails.dateCreated.toISOString().slice(0, 16)} 
                onChange={(e) => setOrderDetails(prev => ({ ...prev, dateCreated: new Date(e.target.value) }))} 
                className="w-2/3"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Delivery Date:</span>
              <Input 
                type="datetime-local"
                value={orderDetails.deliveryDate.toISOString().slice(0, 16)} 
                onChange={(e) => setOrderDetails(prev => ({ ...prev, deliveryDate: new Date(e.target.value) }))} 
                className="w-2/3"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Attachments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orderDetails.attachments.length > 0 ? (
              <ul className="space-y-2">
                {orderDetails.attachments.map((attachment, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <Input 
                      value={attachment} 
                      onChange={(e) => {
                        const newAttachments = [...orderDetails.attachments]
                        newAttachments[index] = e.target.value
                        setOrderDetails(prev => ({ ...prev, attachments: newAttachments }))
                      }} 
                      className="flex-grow"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No attachments available</p>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the order and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteOrder}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}