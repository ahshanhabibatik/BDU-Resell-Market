import Banner from "./Banner";
import Footer from "./Footer";

const Home = () => {
    return (
        <div>

            <div className="border-t ">
                <Banner />
            </div>
            <div className="text-white text-center border-t h-[100vh]">
                <h1>Product interface</h1>
            </div>

            <div className="border-t">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;
