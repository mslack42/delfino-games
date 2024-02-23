import { listHolders } from "@/database/listHolders";
import { faDice } from "@fortawesome/free-solid-svg-icons/faDice";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function People() {
  const holders = await listHolders();

  return (
    <div className="text-center">
      <h1 className="text-2xl pt-4">People</h1>
      <p>Below in a list of all boardgame-carrying people.</p>
      <br />
      <div className="rounded-lg">
        <table className="table-auto">
          <tbody className="rounded-lg">
            <tr className="bg-teal-300 p-1">
              <th className="p-1">Name</th>
              <th className="p-1">Office</th>
              <th className="p-1">Actions</th>
            </tr>
            {holders.map((h) => (
              <tr key={h.id} className="bg-cyan-100 even:bg-cyan-200">
                <td className="p-2">{h.name}</td>
                <td className="p-2">(TBD, but probably Poole)</td>
                <td className="p-2">
                  <ul className="flex space-x-2">
                    <li>
                      <Link
                        href={`/games/holder/${h.name}`}
                        className="text-center"
                      >
                        <FontAwesomeIcon icon={faDice} className="h-5" />
                      </Link>
                    </li>
                    <li><FontAwesomeIcon icon={faPenToSquare} className="h-5" /></li>
                    <li><FontAwesomeIcon icon={faTrash} className="h-5" /></li>
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
