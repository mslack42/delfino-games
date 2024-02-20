import { Location, Ownership } from "@prisma/client";

export type InventoryItem = {
    bggData: {
      bggId: number;
      description: string | undefined;
      image?: string | undefined;
      thumb?: string | undefined;
      specs: {
        maxPlayerCount?: number;
        minPlayerCount?: number;
        maxPlayTime?: number;
        minPlayTime?: number;
        tags: string[];
      };
      stats: {
        score?: number;
        rank?: number;
      };
      lastUpdated: Date | undefined;
    };
    name: string;
    id: number;
    dsData: {
      holder: string;
      inRotation: boolean;
      location: Location;
      ownership: Ownership;
    };
  };
  