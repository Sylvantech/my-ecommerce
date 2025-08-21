import UserFetch from "../../components/Admin/UserList";

export default function UserList() {
  return (
    <div className="flex justify-center p-6 ml-60">
      <div className="w-full max-w-6xl border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gray-100 text-gray-700 px-6 py-4 border-b border-gray-300">
          <h2 className="text-xl">Liste des utilisateurs :</h2>
        </div>

        <div className="p-4 bg-white">
          <table className="w-full border-collapse text-center">
            <UserFetch />
          </table>
        </div>
      </div>
    </div>
  );
}
