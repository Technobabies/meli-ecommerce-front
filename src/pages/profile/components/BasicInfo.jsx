export default function BasicInfo() {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className="bg-gray-800 shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-white mb-4">Basic Information</h2>
      <div className="text-gray-300">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>
    </div>
  );
}
