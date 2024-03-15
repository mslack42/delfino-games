"use client";
import { LeftSheet } from "@/components/common/LeftSheet";
import { FilterContextProvider } from "./GamesFilterContext";
import { FilterPanel } from "./FilterPanel";
import { FilterPanelHead } from "./FilterPanelHead";
import { Suspense } from "react";

export function GamesListFilterControls({ cacheKey }: { cacheKey: string }) {
  return (
    <FilterContextProvider localStorageKey={`gamelistfilter${cacheKey}`}>
      <LeftSheet
        head={
          <Suspense>
            <FilterPanelHead />
          </Suspense>
        }
      >
        <Suspense>
          <div className="h-full w-full overflow-y-auto">
            <FilterPanel />
          </div>
        </Suspense>
      </LeftSheet>
    </FilterContextProvider>
  );
}
