import { Panel } from "../common/Panel";

export function HalfPagePanel({ content }: { content: React.ReactNode }) {
  return (
    <Panel
      className="w-full md:w-1/2 "
      content={
        <Panel
          className="p-4 pt-2 pb-2 m-4 bg-card rounded-lg"
          content={content}
        ></Panel>
      }
    ></Panel>
  );
}
