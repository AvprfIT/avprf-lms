
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { randomUUID } from "node:crypto";

// AWS configuration
const region = process.env.AWS_REGION || "ap-south-1";
const bucket = process.env.AWS_S3_BUCKET;

// Create S3 connection
const s3 = new S3Client({
  region,
});

// Upload course image to S3
export const uploadCourseImage = async (file) => {
  if (!file) return null;

  if (!bucket) {
    throw new Error("AWS S3 bucket name is missing.");
  }

  const allowedTypes = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  const extension = allowedTypes[file.mimetype];

  if (!extension) {
    throw new Error("Only JPG, PNG and WEBP images are allowed.");
  }

  // Generate a unique file name
  const fileName = `${randomUUID()}.${extension}`;

  // S3 folder location
  const key = `lms/courses/${fileName}`;

  // Upload file
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    CacheControl: "public, max-age=31536000",
  });

  await s3.send(command);

  // Return image URL
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

export default s3;
