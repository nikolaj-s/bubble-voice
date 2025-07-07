import React from "react";

import { usePermissions } from "../../../../hooks/usePermissions";

const ProtectedFormWrapper = ({ children }) => {

  const permissions = usePermissions();

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, {permissions: permissions})
  })
  
  return <>{childrenWithProps}</>;
};

export default ProtectedFormWrapper;

