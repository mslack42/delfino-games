import { listUsers } from "@/database/listUsers";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Users() {
  const holders = await listUsers();

  return (
    <div className="text-center">
      <h1 className="text-2xl pt-4">Users</h1>
      <p>Below in a list of all site users.</p>
      <br />
      <div className="rounded-lg">
        <table className="table-auto">
          <tbody className="rounded-lg">
            <tr className="bg-teal-300 p-1">
              <th className="p-1">Name</th>
              <th className="p-1">Email</th>
              <th className="p-1">Role</th>
              <th className="p-1">Actions</th>
            </tr>
            {holders.map((h) => (
              <tr key={h.id} className="bg-cyan-100 even:bg-cyan-200">
                <td className="p-2">{h.name}</td>
                <td className="p-2">{h.email}</td>
                <td className="p-2">{h.accounts[0].role}</td>
                <td className="p-2">
                  <ul className="flex space-x-2 justify-end">
                    {h.accounts[0].role === "Unverified" ? (
                      <li>
                        <FontAwesomeIcon icon={faCheck} className="h-5" />
                      </li>
                    ) : (
                      <li>
                        <Link href={`/users/${h.id}`} className="text-center">
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="h-5"
                          />
                        </Link>
                      </li>
                    )}
                    <li>
                      <FontAwesomeIcon icon={faTrash} className="h-5" />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faUnlock} className="h-5" />
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
