"use client";
import { CustomFontAwesomeIcon } from "@/components/common/CustomFontAwesomeIcon";
import { CustomPopover } from "@/components/common/CustomPopover";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

export function Referral({ code }: { code: string }) {
  const copyReferralLink = () => {
    const url =
      window.location.host + `/register?invite=${encodeURIComponent(code)}`;
    navigator.clipboard.writeText(url);
  };
  return (
    <>
      <div className="py-4 text-xs flex flex-row justify-center space-x-2">
        <p>Want to invite new users with a nice convenient link?</p>
        <CustomPopover
          head={
            <div onClick={copyReferralLink}>
              <CustomFontAwesomeIcon icon={faCopy} />
            </div>
          }
          content="Copied!"
        />
      </div>
    </>
  );
}
