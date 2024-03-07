"use client";
import useMounted from "@/lib/hooks/useMounted";
import React from "react";
import EditUserModal from "./EditUserModal";

const EditUserModalProvider = () => {
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <>
      <EditUserModal />
    </>
  );
};

export default EditUserModalProvider;
