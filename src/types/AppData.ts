import { User } from "@lib";

export interface AppData {
    user: User;
    initialLoad: boolean;
    isInitialLoadTimeout: boolean;
    handlePageRefresh: () => void;
}