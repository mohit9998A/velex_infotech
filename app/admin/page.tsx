"use client";

import { useEffect, useState } from "react";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState<string | undefined>();

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/check");
      const data = await res.json();
      if (res.ok && data.authenticated) {
        setAuthenticated(true);
        setAdminEmail(data.session?.email);
      } else {
        setAuthenticated(false);
      }
    } catch {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setAdminEmail(undefined);
  };

  if (authenticated === null) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={checkAuth} />;
  }

  return <AdminDashboard onLogout={handleLogout} adminEmail={adminEmail} />;
}
