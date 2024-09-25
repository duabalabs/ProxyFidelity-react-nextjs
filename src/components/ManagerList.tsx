import { User } from "@lib";

export const ManagerList = ({ managers }: { managers: User[] }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Managers</h2>
        <ul className="space-y-4">
          {managers.map((manager) => (
            <li key={manager.id} className="bg-gray-100 p-4 rounded-lg shadow">
              <a href={`/managers/${manager.id}`} className="block">
                <h3 className="text-lg font-semibold text-gray-700">{manager.email}</h3>
                <p className="text-gray-500">Manager</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  