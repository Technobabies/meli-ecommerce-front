import { useState } from "react";

export default function AddressForm({ onSave }) {

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  };

  const [info, setInfo] = useState({
    address: "",
    city: "",
    postal: "",
  });

  const handleChange = (k, v) => {
    const updated = { ...info, [k]: v };
    setInfo(updated);
    onSave(updated); 
  };

  return (
    <div className="space-y-4">
        {Object.keys(user).map(key => (
        <input
          key={key}
          type="text"
          disabled
          placeholder={key[0].toUpperCase() + key.slice(1)}
          className="w-full p-2 rounded bg-surface text-white"
          value={user[key]}
          onChange={e => handleChange(key, e.target.value)}
        />
      ))}
      {Object.keys(info).map(key => (
        <input
          key={key}
          type="text"
          placeholder={key[0].toUpperCase() + key.slice(1)}
          className="w-full p-2 rounded bg-surface text-white"
          value={info[key]}
          onChange={e => handleChange(key, e.target.value)}
        />
      ))}
    </div>
  );
}
