import React from "react";

const AuthLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="h-full flex items-center justify-center bg-secondary">
      {children}
    </div>
  );
};

export default AuthLayout;
