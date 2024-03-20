/* eslint-disable @typescript-eslint/no-explicit-any */
import { Database, DataSnapshot, get, getDatabase, ref } from 'firebase/database';

import 'reflect-metadata';
// eslint-disable-next-line no-unused-vars
import { Service } from 'typedi';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { User } from '@app/constants/basic-interface';

export interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
}

@Service()
// eslint-disable-next-line no-unused-vars
export class RealtimeDatabaseService {
    private db: Database;
    private app: FirebaseApp;

    constructor() {
        const firebaseConfig: FirebaseConfig = {
            apiKey: '',
            authDomain: '',
            databaseURL: '',
            projectId: '',
            storageBucket: '',
            messagingSenderId: '',
            appId: '',
            measurementId: '',
        };
        this.app = initializeApp(firebaseConfig);
        this.db = getDatabase(this.app);
    }

    async getUser(userID: string): Promise<any> {
        return await get(ref(this.db, `users/${userID}`))
            .then((snapshot: DataSnapshot) => {
                return snapshot.val() as User;
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    }
}
