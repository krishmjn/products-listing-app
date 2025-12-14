"use client";
import React, { useState, useEffect } from "react";

interface ClientSideOnlyBadgeProps {
  children: React.ReactNode;
}

const ClientSideOnlyBadge: React.FC<ClientSideOnlyBadgeProps> = ({
  children,
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setHasMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientSideOnlyBadge;
