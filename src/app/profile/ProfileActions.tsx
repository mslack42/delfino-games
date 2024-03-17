"use client";
import Link from "next/link";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { ApplicationRoutes } from "@/constants/ApplicationRoutes";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { DeleteProfileModal } from "./DeleteProfileModal";

export function ProfileActions() {
  const [deleteProfile, setDeleteProfile] = useState(false);
  return (
    <>
      <div className="text-black w-full flex justify-end px-6 py-2 space-x-4">
        <Link href={ApplicationRoutes.EditProfile} aria-label="Edit">
          <CustomFontAwesomeIcon icon={faPenToSquare} className="h-6" />
        </Link>
        <button onClick={() => setDeleteProfile(true)}>
          <CustomFontAwesomeIcon icon={faTrash} className="h-6" />
        </button>
      </div>
      <DeleteProfileModal open={deleteProfile} setOpen={setDeleteProfile} />
    </>
  );
}
