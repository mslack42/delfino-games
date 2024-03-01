export function ActionBarButton({ content }: { content: React.ReactNode }) {
  return (
    <div className="cursor-pointer bg-teal-400 w-8 h-8 rounded-lg text-center flex flex-col justify-center hover:bg-teal-500">
      {content}
    </div>
  );
}
