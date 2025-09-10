import { Card, CardContent } from "@/components/ui/card"
import useGetDisasters from "@/hooks/useGetDisasters"
import Navbar from "./shared/Navbar"

export default function Disasters() {
  const disasters = useGetDisasters() 

return (
  <>
    <Navbar/>
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Active Disasters</h1>

      {disasters.length === 0 ? (
        <p className="text-gray-600">No active disasters found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {disasters.map((d) => (
            <Card key={d._id} className="shadow-md border rounded-2xl">
              <CardContent className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{d.type}</h2>
                <p className="text-gray-700">{d.description}</p>
                <p className="text-sm text-gray-600">
                  📍 Lat: {d.location.lat}, Lng: {d.location.lng}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Severity:</span> {d.severity}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span> {d.status}
                </p>
                
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Created At:</span> {new Date(d.createdAt).toLocaleString()}
                </p>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  </>
)
}
