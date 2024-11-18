import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();



// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  doctorImageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url);
      return { uploadedBy:"sheyman" };

    }),
    medicalReport: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("file url", file.url);
      return { uploadedBy:"sheyman" };

    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
