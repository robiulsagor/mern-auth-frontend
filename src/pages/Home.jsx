import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className='flex items-center justify-center min-h-screen flex-col bg-[url("assets/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
