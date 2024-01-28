import { useRoutes } from "react-router-dom";

import Footer_ from "./components/Footer_";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import AddMusicCDs from "./components/AddMusicCDs";
import SellerProfile from "./components/SellerProfile";
import EditMusicCds from "./components/EditMusicCds";

// import AllMusicList from "./components/AllMusicList";

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/addMusic/:id",
      element: <AddMusicCDs />,
    },
    {
      path: "/sellerProfile/:id",
      element: <SellerProfile />,
    },
    {
      path: "/editMusicbySeller/:id",
      element: <EditMusicCds />,
    },
  ]);
  return (
    <>
      <Navbar />

      {element}

      <Footer_ />
      {/* <Flex> */}
      {/* <Layout>
          
          
        </Layout> */}
      {/* </Flex> */}
      {/* 
      <Navbar/>
      
      
      {element}
      <Flex justify='center' align='flex-end'>
      <Footer_/>
      </Flex> */}
    </>
  );
}

export default App;
