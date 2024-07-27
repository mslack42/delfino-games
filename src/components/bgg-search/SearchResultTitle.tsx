export function SearchResultTitle({ name }: { name: string }) {
  return (
    <>
      <div className="bg-gradient-to-b from-teal-600 via-teal-600 to-transparent py-1 rounded-lg">
        <h1
          className="text-center text-sm md:text-lg font-bold line-clamp-1  "
          title={name}
        >
          {name}
        </h1>
      </div>
    </>
  );
}
