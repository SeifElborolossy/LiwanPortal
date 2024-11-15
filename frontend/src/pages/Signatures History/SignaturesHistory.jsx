import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Check, Search } from 'lucide-react'

const signatures = [
  { id: "SIG-001", order: "Product A Purchase", orderId: "ORD-001", from: "John Doe", date: "2023-06-15 10:30:00", status: "Approved", approvedBy: "Jane Manager", role: "Sales Manager" },
  { id: "SIG-002", order: "Service B Subscription", orderId: "ORD-002", from: "Jane Smith", date: "2023-06-14 14:45:00", status: "Pending", approvedBy: "-", role: "-" },
  { id: "SIG-003", order: "Product C Refund", orderId: "ORD-003", from: "Bob Johnson", date: "2023-06-13 09:15:00", status: "Rejected", approvedBy: "Mike Supervisor", role: "Customer Service Supervisor" },
  { id: "SIG-004", order: "Service D Renewal", orderId: "ORD-004", from: "Alice Brown", date: "2023-06-12 16:20:00", status: "Approved", approvedBy: "Sarah Director", role: "Operations Director" },
  { id: "SIG-005", order: "Product E Exchange", orderId: "ORD-005", from: "Charlie Davis", date: "2023-06-11 11:00:00", status: "Pending", approvedBy: "-", role: "-" },
]

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return 'bg-green-500'
    case 'pending':
      return 'bg-yellow-500'
    case 'rejected':
      return 'bg-red-500'
    default:
      return 'bg-gray-500'
  }
}

export default function SignaturesHistory() {
  const [search, setSearch] = useState("")
  const [orderFilter, setOrderFilter] = useState("")
  const [orderIdFilter, setOrderIdFilter] = useState("")
  const [fromFilter, setFromFilter] = useState("")
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  })

  const filteredSignatures = signatures.filter((signature) => {
    const matchesSearch = 
      signature.id.toLowerCase().includes(search.toLowerCase()) ||
      signature.order.toLowerCase().includes(search.toLowerCase()) ||
      signature.orderId.toLowerCase().includes(search.toLowerCase()) ||
      signature.from.toLowerCase().includes(search.toLowerCase()) ||
      signature.approvedBy.toLowerCase().includes(search.toLowerCase()) ||
      signature.role.toLowerCase().includes(search.toLowerCase())
    const matchesOrder = !orderFilter || signature.order.toLowerCase().includes(orderFilter.toLowerCase())
    const matchesOrderId = !orderIdFilter || signature.orderId.toLowerCase().includes(orderIdFilter.toLowerCase())
    const matchesFrom = !fromFilter || signature.from.toLowerCase().includes(fromFilter.toLowerCase())
    const signatureDate = new Date(signature.date)
    const matchesDate = (!dateRange.from || signatureDate >= dateRange.from) &&
                        (!dateRange.to || signatureDate <= dateRange.to)
    
    return matchesSearch && matchesOrder && matchesOrderId && matchesFrom && matchesDate
  })

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Signatures History</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Input
              className="flex-1"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              startIcon={<Search className="h-4 w-4" />}
            />
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
          <div className="flex flex-wrap gap-4">
            <Input
              className="flex-1"
              placeholder="Filter by Order"
              value={orderFilter}
              onChange={(e) => setOrderFilter(e.target.value)}
            />
            <Input
              className="flex-1"
              placeholder="Filter by Order ID"
              value={orderIdFilter}
              onChange={(e) => setOrderIdFilter(e.target.value)}
            />
            <Input
              className="flex-1"
              placeholder="Filter by From"
              value={fromFilter}
              onChange={(e) => setFromFilter(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Signature ID</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Date & Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Approved by</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSignatures.map((signature) => (
              <TableRow key={signature.id}>
                <TableCell>{signature.id}</TableCell>
                <TableCell>{signature.order}</TableCell>
                <TableCell>{signature.orderId}</TableCell>
                <TableCell>{signature.from}</TableCell>
                <TableCell>{signature.date}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(signature.status)} text-white`}>
                    {signature.status}
                  </Badge>
                </TableCell>
                <TableCell>{signature.approvedBy}</TableCell>
                <TableCell>{signature.role}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}