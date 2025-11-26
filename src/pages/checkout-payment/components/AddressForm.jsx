import { useState, useEffect } from "react";

export default function AddressForm({ onSave }) {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  };

  const [info, setInfo] = useState({
    address: "Smith Street #44",
    city: "New York",
    postal: "2729",
  });

  // Ensure parent receives the initial dummy data on mount
  useEffect(() => {
    if (typeof onSave === "function") {
      onSave(info);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  const handleChange = (k, v) => {
    const updated = { ...info, [k]: v };
    setInfo(updated);
    if (typeof onSave === "function") onSave(updated);
  };

  return (
    <div className="space-y-4">
      {Object.keys(user).map((key) => (
        <input
          key={key}
          type="text"
          disabled
          placeholder={key[0].toUpperCase() + key.slice(1)}
          className="w-full p-2 rounded bg-surface text-white"
          value={user[key]}
        />
      ))}

      {Object.keys(info).map((key) => (
        <input
          key={key}
          type="text"
          placeholder={key[0].toUpperCase() + key.slice(1)}
          className="w-full p-2 rounded bg-surface text-white"
          value={info[key]}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ))}
    </div>
  );
}
