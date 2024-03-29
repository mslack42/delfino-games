import { BoardGameExpansionBggData, Location, Ownership } from "@prisma/client";

export type InventoryItem = {
  bggData: {
    bggId: number;
    description: string | undefined;
    image?: string | undefined;
    thumb?: string | undefined;
    specs: {
      maxPlayerCount?: number | null;
      minPlayerCount?: number | null;
      maxPlayTime?: number | null;
      minPlayTime?: number | null;
      tags: string[];
    };
    stats: {
      score?: number | null;
      rank?: number | null;
    };
    lastUpdated: Date | undefined;
  };
  name: string;
  id: number;
  dsData: {
    holder: string;
    holderId: number;
    owner: string;
    ownerId: number;
    inRotation: boolean;
    location: Location;
    ownership: Ownership;
    ownedExpansions: BoardGameExpansionBggData[];
  };
};
