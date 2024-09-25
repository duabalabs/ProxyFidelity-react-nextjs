"use client";

import { IParseServerAPICred, Project } from "@lib/parse";
import { useParseConnect } from "@lib/hook/useParse";
import React, { createContext, useState, useEffect } from "react";
import * as dotenv from "dotenv";
import Parse from "parse";
import { User } from "@lib/parse/class/user";
import router from "next/router";
import { UserRoles } from "@types";
dotenv.config();

// Create a Context

export interface AppDataType {
  user?: User;
  initialLoad?: boolean;
  isInitialLoadTimeout?: boolean;
  handlePageRefresh?: () => void;
  signIn?: (email: string, password: string) => void;
  role?: UserRoles;
  projects: Project[];
  clients: User[];
  managers: User[];
  fetchProjects: () => void;
  fetchClients: () => void;
  fetchManagers: () => void;
}
export const AppDataContext = createContext<AppDataType>({
  user: undefined,
  initialLoad: false,
  isInitialLoadTimeout: false,
  handlePageRefresh: function (): void {
    throw new Error("Function not implemented.");
  },
  projects: [],
  clients: [],
  managers: [],
  fetchProjects: function (): void {
    throw new Error("Function not implemented.");
  },
  fetchClients: function (): void {
    throw new Error("Function not implemented.");
  },
  fetchManagers: function (): void {
    throw new Error("Function not implemented.");
  },
});

export const AppDataProvider = ({ children }: any) => {
  const parseConfig: IParseServerAPICred = {
    serverURL: process.env.NEXT_PUBLIC_PARSE_SERVER_URL,
    appId: process.env.NEXT_PUBLIC_PARSE_APP_ID,
    javascriptKey: process.env.NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY,
  };
  const { loadingParse: initialLoad } = useParseConnect(parseConfig);

  const [user, setUser] = useState<User>();
  const [role, setRole] = useState<UserRoles>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<User[]>([]);
  const [managers, setManagers] = useState<User[]>([]);

  // To track whether each list is already loaded
  const [isProjectsLoaded, setIsProjectsLoaded] = useState(false);
  const [isClientsLoaded, setIsClientsLoaded] = useState(false);
  const [isManagersLoaded, setIsManagersLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = Parse.User.current() as User;
      if (currentUser) {
        setUser(currentUser);
        setRole(currentUser.role as UserRoles);
      }
    };
    fetchUser();
  }, []);

  const fetchProjects = async () => {
    if (!isProjectsLoaded) {
      const query = new Parse.Query(Project);
      if (role === "client") {
        query.equalTo("client", user);
      } else if (role === "manager") {
        query.equalTo("manager", user);
      }
      const results = await query.find();
      setProjects(results);
      setIsProjectsLoaded(true);
    }
  };

  const fetchClients = async () => {
    if (!isClientsLoaded && (role === "admin" || role === "projectManager")) {
      const query = new Parse.Query(User);
      query.equalTo("role", "client");
      const results = await query.find();
      setClients(results);
      setIsClientsLoaded(true);
    }
  };

  const fetchManagers = async () => {
    if (!isManagersLoaded && role === "admin") {
      const query = new Parse.Query(User);
      query.equalTo("role", "projectManager");
      const results = await query.find();
      setManagers(results);
      setIsManagersLoaded(true);
    }
  };

  const [isInitialLoadTimeout, setIsTimeout] = useState(false);
  const TIMEOUT_DURATION = 10000; // 10 seconds

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (initialLoad) {
        setIsTimeout(true); // Set timeout state to true after 10 seconds
      }
    }, TIMEOUT_DURATION);

    return () => clearTimeout(timeout); // Clear timeout when component unmounts or loading is complete
  }, [initialLoad]);

  const signIn = async (email: string, password: string) => {
    try {
      const user = await Parse.User.logIn(email, password);
      setUser(user as User);
      const isProjectManager = user.get("role") === "projectManager";

      setRole(user.get("role"));
      // Navigate based on role
      if (isProjectManager) {
        router.push("/project-manager");
      } else {
        router.push("/client");
      }
    } catch (error) {
      console.error("Failed to sign in", error);
    }
  };

  const handlePageRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <AppDataContext.Provider
      value={{
        user,
        role,
        projects,
        clients,
        managers,
        fetchProjects,
        fetchClients,
        fetchManagers,
        initialLoad,
        isInitialLoadTimeout,
        handlePageRefresh,
        signIn,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => React.useContext(AppDataContext);