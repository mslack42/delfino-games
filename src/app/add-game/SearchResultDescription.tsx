export function SearchResultDescription({ text }: { text: string }) {
  return (
    <>
      <div className="px-2">
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          className="text-left h-16 md:h-32 overflow-hidden hover:overflow-y-scroll pl-1 pr-1 bg-teal-300 rounded-lg mt-2 text-teal-900 md:text-sm text-xs"
        ></div>
      </div>
    </>
  );
}
