import AWS from "aws-sdk";
import {
  AWS_S3_ENABLED,
  AWS_S3_BUCKET_NAME,
  AWS_S3_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} from "../config/config";

let s3Client: AWS.S3 | null = null;

export function initS3Client(): AWS.S3 {
  if (!AWS_S3_ENABLED) {
    console.log("AWS S3 is disabled");
    return null as any;
  }

  if (s3Client) {
    return s3Client;
  }

  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_S3_REGION,
  });

  s3Client = new AWS.S3();

  console.log(`AWS S3 client initialized for bucket: ${AWS_S3_BUCKET_NAME}`);
  return s3Client;
}

export function getS3Client(): AWS.S3 | null {
  if (!AWS_S3_ENABLED) {
    return null;
  }

  if (!s3Client) {
    return initS3Client();
  }

  return s3Client;
}

export async function uploadToS3(
  buffer: Buffer,
  fileName: string,
  mimeType: string,
): Promise<string> {
  const client = getS3Client();

  if (!client) {
    throw new Error("AWS S3 is not enabled or not configured");
  }

  const params: AWS.S3.PutObjectRequest = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: `images/${fileName}`,
    Body: buffer,
    ContentType: mimeType,
    ACL: "public-read",
  };

  try {
    const result = await client.upload(params).promise();
    return result.Location;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload image to S3");
  }
}

export async function deleteFromS3(fileName: string): Promise<void> {
  const client = getS3Client();

  if (!client) {
    throw new Error("AWS S3 is not enabled or not configured");
  }

  const key = fileName.includes("images/") ? fileName : `images/${fileName}`;

  const params: AWS.S3.DeleteObjectRequest = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key,
  };

  try {
    await client.deleteObject(params).promise();
    console.log(`Deleted from S3: ${key}`);
  } catch (error) {
    console.error("Error deleting from S3:", error);
    throw new Error("Failed to delete image from S3");
  }
}

export async function getS3Url(fileName: string): Promise<string> {
  const client = getS3Client();

  if (!client) {
    throw new Error("AWS S3 is not enabled or not configured");
  }

  const key = fileName.includes("images/") ? fileName : `images/${fileName}`;

  const params = {
    Bucket: AWS_S3_BUCKET_NAME,
    Key: key,
    Expires: 3600,
  };

  try {
    const url = await client.getSignedUrlPromise("getObject", params);
    return url;
  } catch (error) {
    console.error("Error getting signed URL from S3:", error);
    throw new Error("Failed to get signed URL from S3");
  }
}
