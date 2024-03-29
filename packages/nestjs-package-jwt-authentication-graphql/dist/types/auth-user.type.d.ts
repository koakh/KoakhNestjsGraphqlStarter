export declare type AuthUser = {
    id: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    roles: string[];
    createdDate?: number;
    createdBy?: string;
    metaData?: any;
};
