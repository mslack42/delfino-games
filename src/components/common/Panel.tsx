export function Panel({
  content,
  className,
}: {
  content: React.ReactNode;
  className: string;
}) {
  return <div className={className}>{content}</div>;
}
