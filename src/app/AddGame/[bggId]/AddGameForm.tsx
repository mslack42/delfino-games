"use client";
import { SelectOrNew } from "@/components/common/SelectOrNew";
import { Ownership, Location } from "@prisma/client";

type AddGameFormProps = {
    holders: { id: number; name: string; }[];
    action: (formData: FormData) => Promise<void>;
    className?: string
};
export function AddGameForm(props: AddGameFormProps) {
    return (
        <form className={"text-justify " + props.className} action={props.action}>
            <div>
                <label>Ownership: </label>
                <select name="ownership">
                    {Object.values(Ownership).map((own) => (
                        <option value={own} key={own}>
                            {own}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Location: </label>
                <select name="location">
                    {Object.values(Location).map((loc) => (
                        <option value={loc} key={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Holder: </label>
                <SelectOrNew
                    selectListValues={props.holders.map((h) => {
                        return {
                            value: `${h.id}`,
                            display: h.name,
                        };
                    })}
                    newValueString={"Add New..."}
                    selectParamName={"holderId"}
                    textParamName={"newHolder"}
                ></SelectOrNew>
            </div>
            <button type="submit">Create</button>
        </form>
    );
}
