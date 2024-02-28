export function createInventoryItemFromPrisma(r: any) {
  return {
    bggData: {
      bggId: (r.bggData?.bggId)!,
      description: r.bggData?.description,
      image: r.bggData?.image,
      thumb: r.bggData?.thumb,
      specs: {
        maxPlayerCount: r.bggData?.specs.maxplayers,
        minPlayerCount: r.bggData?.specs.minplayers,
        maxPlayTime: r.bggData?.specs.maxplaytime_minutes,
        minPlayTime: r.bggData?.specs.minplaytime_minutes,
        tags: r.bggData?.specs.tags ?? [],
      },
      stats: {
        score: r.bggData?.stats.bggAverageScore,
        rank: r.bggData?.stats.bggRank,
      },
      lastUpdated: r.bggData?.lastUpdate,
    },
    name: r.name,
    id: r.id,
    dsData: {
      holder: (r.dsData?.holder.name)!,
      inRotation: (r.dsData?.inCurrentRotation)!,
      location: (r.dsData?.holder.location)!,
      ownership: (r.dsData?.ownership)!,
    },
  };
}
