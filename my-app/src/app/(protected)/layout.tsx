import NavBarV1 from "@/components/NavBarV1/NavBarV1";
import React from "react";

// FYI: The protected folder really doesn't mean that routes outside of it are not protected.
// It's just a way to organize the layout components.
// It's also useful for files like this to set a common layout

const ProtectedLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className=""
      // style={{ border: "5px solid red" }}
    >
      <NavBarV1 />
      {/* <h1>ProtectedLayout</h1> */}
      {children}
    </div>
  );
};

export default ProtectedLayout;
