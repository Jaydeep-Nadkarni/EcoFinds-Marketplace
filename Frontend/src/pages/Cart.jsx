export default function Cart() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Cart</h2>
      <div className="border p-4 rounded mb-3">
        <p className="font-semibold">Second-hand Chair</p>
        <p className="text-green-600">₹500</p>
      </div>
      <button className="bg-green-600 text-white w-full py-2 rounded">Checkout</button>
    </div>
  );
}
