import {
  BooleanTypeFilterKeys,
  BubbleTypeFilterKeys,
  ControlsKey,
  FilterState,
  SliderTypeFilterKeys,
  TextTypeFilterKeys,
} from "../types";

export function getCachedFilterState(
  cacheVal: FilterState,
  defVal: FilterState,
  controls: ControlsKey[]
) {
  let output: FilterState = defVal;
  try {
    const out: FilterState = {
      ...cacheVal,
      bubbleTypeFilters: {
        ...cacheVal.bubbleTypeFilters,
        office: {
          ...cacheVal.bubbleTypeFilters.office,
          values: cacheVal.bubbleTypeFilters.office.values.filter((v) =>
            defVal.bubbleTypeFilters.office.values.includes(v)
          ),
        },
        holders: {
          ...cacheVal.bubbleTypeFilters.holders,
          values: cacheVal.bubbleTypeFilters.holders.values.filter((v) =>
            defVal.bubbleTypeFilters.holders.values.includes(v)
          ),
        },
        tags: {
          ...cacheVal.bubbleTypeFilters.tags,
          values: cacheVal.bubbleTypeFilters.tags.values.filter((v) =>
            defVal.bubbleTypeFilters.tags.values.includes(v)
          ),
        },
      },
    };
    for (const key of BubbleTypeFilterKeys) {
      if (!controls.includes(key)) {
        delete out.bubbleTypeFilters[key];
      }
    }
    for (const key of SliderTypeFilterKeys) {
      if (!controls.includes(key)) {
        delete out.sliderTypeFilters[key];
      }
    }
    for (const key of TextTypeFilterKeys) {
      if (!controls.includes(key)) {
        delete out.textTypeFilters[key];
      }
    }
    for (const key of BooleanTypeFilterKeys) {
      if (!controls.includes(key)) {
        delete out.booleanTypeFilters[key];
      }
    }

    output = out;
  } catch (err) {
    output = defVal;
  } finally {
    return output;
  }
}
