"use client";
type CustomSubmitButtonProps = {
  innerText: string;
};
export function CustomSubmitButton(props: CustomSubmitButtonProps) {
  return (
    <button type="submit" className="bg-slate-300 w-20 hover:bg-slate-200">
      {props.innerText}
    </button>
  );
}
