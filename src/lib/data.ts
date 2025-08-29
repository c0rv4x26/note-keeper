import { z } from 'zod';
import { collection } from '@github/spark/db';

export const textEntry = z.object({
  content: z.string(),
  updatedAt: z.number(),
  createdAt: z.number(),
});

export const textEntryCollection = collection(textEntry, 'textEntries');