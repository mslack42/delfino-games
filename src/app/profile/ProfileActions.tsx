import Link from "next/link";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";

export function ProfileActions() {
  return (
    <div className="text-black w-full flex justify-end px-6 py-2">
      <Link href={ApplicationRoutes.EditProfile}>
        <CustomFontAwesomeIcon icon={faPenToSquare} className="h-6" />
      </Link>
    </div>
  );
}
