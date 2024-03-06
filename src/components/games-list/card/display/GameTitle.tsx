import { ApplicationRoutes } from "@/constants/routes";
import Link from "next/link";

export function GameTitle(props: { id: number; name: string }) {
  const { id, name } = props;
  return (
    <Link href={ApplicationRoutes.Game(id)}>
      <div className="bg-gradient-to-b from-teal-600 via-teal-600 to-transparent py-1 rounded-lg">
        <h1
          className="text-center text-sm font-bold line-clamp-1  "
          title={name}
        >
          {name}
        </h1>
      </div>
    </Link>
  );
}
