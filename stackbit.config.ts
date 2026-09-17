import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "custom",
  nodeVersion: "18",

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Settings",
          type: "data",
          filePath: "content/settings.json",
          fields: [
            { name: "name", type: "string", required: true },
            { name: "tagline", type: "string" },
            { name: "bio", type: "text" },
            { name: "email", type: "string" },
            { name: "linkedin", type: "string" },
            { name: "youtube", type: "string" },
            { name: "languages", type: "list", items: { type: "string" } },
            { name: "tools", type: "list", items: { type: "string" } }
          ]
        },
        {
          name: "Projects",
          type: "data",
          filePath: "content/projects.json",
          fields: [
            {
              name: "landscape",
              type: "list",
              items: {
                type: "object",
                fields: [
                  { name: "title", type: "string" },
                  { name: "youtube_url", type: "string" },
                  { name: "cover_image", type: "image" },
                  { name: "year", type: "string" }
                ]
              }
            },
            {
              name: "vertical",
              type: "list",
              items: {
                type: "object",
                fields: [
                  { name: "title", type: "string" },
                  { name: "youtube_url", type: "string" },
                  { name: "cover_image", type: "image" },
                  { name: "year", type: "string" }
                ]
              }
            }
          ]
        }
      ],
      assetsConfig: {
        referenceType: "static",
        staticDir: ".",
        uploadDir: "images",
        publicPath: "/"
      }
    })
  ],

  // Since this is a single static index.html (no page routing),
  // we point the visual editor at "/" for both data documents.
  siteMap: ({ documents }) => {
    return documents
      .filter((d) => d.modelName === "Settings" || d.modelName === "Projects")
      .map((document) => ({
        stableId: document.id,
        urlPath: "/",
        document
      }));
  }
});
