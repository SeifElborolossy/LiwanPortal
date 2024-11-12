import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Widgets = ({ statusCounts }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="bg-yellow-500 text-white rounded-md rounded-b-none">
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mt-2">
              {statusCounts["Pending"] || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-green-500 text-white rounded-md rounded-b-none">
            <CardTitle>Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mt-2">
              {statusCounts["Completed"] || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-red-500 text-white rounded-md rounded-b-none">
            <CardTitle>Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mt-2">
              {statusCounts["Cancelled"] || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="bg-blue-500 text-white rounded-md rounded-b-none">
            <CardTitle>Work In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mt-2">
              {statusCounts["Work In Progress"] || 0}
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Widgets;
