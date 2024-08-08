import Footer from "./component/Footer";
import Manager from "./component/Manager";
import Navbar from "./component/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <main className="flex-grow">
          <Manager />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default App;
