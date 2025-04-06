import { Account, Client, ID } from "appwrite";
import conf from "../conf/config";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.account = new Account(this.client);
  }
  // createAccount method to register a new user
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return userAccount; // Return the user account object if successful
      } else {
        throw new Error("Account creation failed.");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }
  // login method to authenticate a user
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }
  // logout method to log out the user

  async logout() {
    try {
      return await this.account.deleteSessions("current");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
  // get current user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error getting current user:", error);
    }
    return null; // Return null if no user is found
  }
}

const authService = new AuthService();

export default authService;
