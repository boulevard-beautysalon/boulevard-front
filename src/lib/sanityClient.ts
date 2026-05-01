import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "8nzg1eu4",
  dataset: "production",
  apiVersion: "2026-04-13",
  useCdn: true,
  stega: {
    enabled: false,
  },
});

const imageBuilder = createImageUrlBuilder(client);

export const urlForImage = (source: Parameters<typeof imageBuilder.image>[0]) =>
  imageBuilder.image(source);
