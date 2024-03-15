export function Conditional({
  when,
  children,
}: React.PropsWithChildren<{ when: boolean }>) {
  return <>{when && children}</>;
}
