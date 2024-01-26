import React, { ReactNode } from 'react';

type MainProps = {
   children: ReactNode;
};

function MainLayout({ children }: MainProps) {
   return (
      <div className="main-layout">
         {children}
      </div>
   );
}

export default MainLayout;
