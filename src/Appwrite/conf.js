import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/config";

export class Service {
  client = new Client();
  databases;
  bucket;
  // this is the constructor of the class
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  // create a document in the database
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }
  // update a document in the database
  async updatePost(
    documentId,
    { title, slug, content, featuredImage, status }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }
  // delete a document in the database
  async deletePost(documentId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
  // get a document in the database
  async getPost(documentId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
  }
  // get all documents in the database
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
    }
  }
  // upload a file to the bucket
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }
  // delete a file in the bucket
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }
  // get a file in the bucket
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
