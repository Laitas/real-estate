import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

export const config = {
  platform: "com.laitas.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");

    const res = account.createOAuth2Token(OAuthProvider.Google, redirectUri);

    if (!res) throw new Error("Failed to login, no res");

    const browserResult = await WebBrowser.openAuthSessionAsync(
      res.toString(),
      redirectUri
    );

    if (browserResult.type !== "success")
      throw new Error("Failed to login, type is not success");

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId)
      throw new Error("Failed to login, secret or userId is missing");

    const session = await account.createSession(userId, secret);
    if (!session) throw new Error("Failed to login, no session");

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    const res = await account.deleteSession("current");
    return res;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUser() {
  try {
    const res = await account.get();

    if (res.$id) {
      const userAvatar = avatar.getInitials(res.name);
      return { ...res, avatar: userAvatar.toString() };
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
