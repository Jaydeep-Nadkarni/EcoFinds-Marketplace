export default function Dashboard() {
  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">User Dashboard</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Username" className="w-full border rounded px-3 py-2" />
        <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
        <input type="password" placeholder="Change Password" className="w-full border rounded px-3 py-2" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Save</button>
      </form>
    </div>
  );
}
