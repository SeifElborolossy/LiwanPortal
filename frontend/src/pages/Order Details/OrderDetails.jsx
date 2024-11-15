import { useState } from 'react'
import { CalendarIcon, CreditCard, FileText, Package, Trash2, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Link } from 'react-router-dom';

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
function StatusBadge({ status }) {
  return (
    <div>
      
    <Badge className={`${statusColors[status]} text-white`}>
      {status}
    </Badge>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function PriorityBadge({ priority }) {
  return (
    <Badge className={`${priorityColors[priority]} text-white`}>
      {priority}
    </Badge>
  )
}

const dummyOrderDetails = {
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
}

export default function OrderDetailsPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDeleteOrder = () => {
    // Implement delete logic here
    console.log("Order deleted")
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-10 space-y-6">
        {/* Header >> Title, Edit & Delete Buttons */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="md:text-3xl font-bold text-xl">Order Details</h1>
        <div className="space-x-2 flex">
          <Link to='/edit-order'>
            <Button>Edit Order</Button>
          </Link>
          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Order
          </Button>
        </div>
      </header>
      {/* Order Details >> Title & Description */}
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
            <p>{dummyOrderDetails.orderTitle}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Description:</h3>
            <p>{dummyOrderDetails.orderDescription}</p>
          </div>
        </CardContent>
      </Card>
      {/* Order Information >> Order ID, Price, Delivery Status, Payment Method */}
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
              <span>{dummyOrderDetails.orderId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Price:</span>
              <span>SAR{" "}{dummyOrderDetails.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Status:</span>
              <StatusBadge status={dummyOrderDetails.deliveryStatus} />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Priority:</span>
              <PriorityBadge priority={dummyOrderDetails.orderPriority} />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Payment Method:</span>
              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                {dummyOrderDetails.paymentMethod}
              </span>
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
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">{dummyOrderDetails.orderingPerson.name}</p>
                <p className="text-sm text-muted-foreground">{dummyOrderDetails.orderingPerson.email}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ordering Customer:</h3>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">{dummyOrderDetails.orderCustomer.name}</p>
                <p className="text-sm text-muted-foreground">{dummyOrderDetails.orderCustomer.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Order Details >> Ordering Person & Ordering Customer */}
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
            <p>{dummyOrderDetails.orderTitle}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Description:</h3>
            <p>{dummyOrderDetails.orderDescription}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Additional Details:</h3>
            <p>{dummyOrderDetails.orderDetails}</p>
          </div>
        </CardContent>
      </Card>

      {/* Order Details >> Dates & Attachments */}
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
              <span>{dummyOrderDetails.dateCreated.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Delivery Date:</span>
              <span>{dummyOrderDetails.deliveryDate.toLocaleString()}</span>
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
            {dummyOrderDetails.attachments.length > 0 ? (
              <ul className="space-y-2">
                {dummyOrderDetails.attachments.map((attachment, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <a href={attachment} className="text-blue-500 hover:underline">
                      Attachment {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No attachments available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Order Confirmation Dialog */}

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