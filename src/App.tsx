import { GitHubBanner, Refine} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import {BrowserRouter, Outlet, Route, Routes} from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "@/pages/dashboard.tsx";
import {Home, BookOpen} from "lucide-react";
import {Layout} from "@/components/refine-ui/layout/layout.tsx";
import TiersList from "@/pages/tiers/list.tsx";
import TiersCreate from "@/pages/tiers/create.tsx";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "zh5YTC-2Px9sA-ivlgPO",
              }}
              resources={[
                  {
                      name: 'dashboard',
                      list: '/',
                      meta: { label: 'Home', icon: <Home />}
                  },
                  {
                      name: 'tiers',
                      list: '/tiers',
                      create: '/tiers/create',
                      meta: { label: 'tiers', icon: <BookOpen />}
                  }
              ]}
            >
              <Routes>
                  <Route element={
                      <Layout>
                          <Outlet />
                      </Layout>
                  }>
                      <Route path="/" element={<Dashboard />} />
                      <Route path = "tiers">
                          <Route index element={<TiersList />} />
                          <Route path="create" element={<TiersCreate/>} />
                      </Route>
                  </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
