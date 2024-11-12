import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TableRowComponent = ({ order }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Completed":
        return "bg-green-500";
      case "Cancelled":
        return "bg-red-500";
      case "Work In Progress":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <TableRow key={order.id}>
        <TableCell className="text-center">{order.id}</TableCell>
        <TableCell className="text-center">{order.user}</TableCell>
        <TableCell className="text-center">{order.orderName}</TableCell>

        <TableCell className="text-center">
          <Badge className={`${getStatusColor(order.status)} text-white`}>
            {order.status}
          </Badge>
        </TableCell>
        <TableCell className="text-center">{order.date}</TableCell>
        <TableCell className="text-center">
          SAR {order.pricing.toFixed(2)}
        </TableCell>
        <TableCell className="text-center">{order.method}</TableCell>
        <TableCell className="text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm">
                View Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Order Description</DialogTitle>
              </DialogHeader>
              <p>{order.orderDescription}</p>
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
    </>
  );
};


TableRowComponent.propTypes = {
    order: PropTypes.shape({
      orderName: PropTypes.string,
      user: PropTypes.string,
      status: PropTypes.string,
      date: PropTypes.string,
      pricing: PropTypes.number,
      method: PropTypes.string,
    })
  };

export default TableRowComponent;
