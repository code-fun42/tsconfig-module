import React, {lazy, Suspense, useState} from 'react';
import Home from "@pages/Home";
import MainLayout from "@layouts/Main";

const AboutLazy = lazy(() => import("@pages/About"));

function App() {
   const [isAbout, setIsAbout] = useState(false);

   function addAbout() {
      setIsAbout(true);
   }

   return (
      <MainLayout>
         <button onClick={addAbout}>Добавить страницу About</button>
         <Home/>
         <Suspense fallback={<div>Loading...</div>}>
            {isAbout ?
               <Suspense fallback={<div>Loading...</div>}>
                  <AboutLazy/>
               </Suspense> : null
            }
         </Suspense>
      </MainLayout>
   );
}

// {isAbout ?
// <Suspense fallback={<div>Loading...</div>}>
//     <Modal/>
// </Suspense> : null
// }

export default App;
