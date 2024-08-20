import { getApps, getApp, cert, initializeApp } from "firebase-admin/app";
import type { App } from "firebase-admin/app"; // Import App type only
import { getFirestore } from "firebase-admin/firestore";

// Import the service account key JSON
const serviceKey = require("./firebase_service_key");

// Declare the app variable with the App type
let app: App;

// Initialize Firebase Admin SDK only if no apps have been initialized
if (getApps().length === 0) {
    app = initializeApp({
        credential: cert(serviceKey),
    });
} else {
    app = getApp();
}

// Initialize Firestore with the admin app
const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
