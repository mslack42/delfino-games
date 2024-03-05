import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function BurgerButton() {
  return (
    <div className="h-full flex-col justify-center">
      <FontAwesomeIcon icon={faBars} className="text-white h-8" />
    </div>
  );
}
