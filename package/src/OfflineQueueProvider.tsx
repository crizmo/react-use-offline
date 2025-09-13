import React, { ReactNode } from "react";

type Props = { children: ReactNode };

export const OfflineQueueProvider: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};