export default function MyListings() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Listings</h2>
      <div className="space-y-4">
        <div className="border p-4 rounded flex justify-between items-center">
          <div>
            <p className="font-semibold">Old Sofa</p>
            <p>₹2000</p>
          </div>
          <div className="space-x-2">
            <button className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            <button className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
