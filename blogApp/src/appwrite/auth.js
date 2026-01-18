import config from "../config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password
      );

      if (userAccount) {
        return this.login({ email, password });
      }

      return userAccount;
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    return await this.account.createEmailSession(email, password);
  }

async getCurrentUser() {
  try {
    return await this.account.get();
  } catch (error) {
    if (error.code === 401) {
      // user is not logged in → normal case
      return null;
    }
    throw error;
  }
}

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logOut :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
