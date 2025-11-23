import BasicInfo from "./components/BasicInfo";
import CardInfo from "./components/CardInfo";

export default function ProfilePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
      <BasicInfo />
      <CardInfo />
    </div>
  );
}
