type Props = {
  action?: () => void;
};

export function ActionBarButton({
  children,
  action,
}: React.PropsWithChildren<Props>) {
  return (
    <div
      className="cursor-pointer bg-teal-400 md:w-8 md:h-8 h-6 w-6 text- md:text-sm rounded-lg text-center flex flex-col justify-center hover:bg-teal-500"
      onClick={action}
    >
      {children}
    </div>
  );
}
