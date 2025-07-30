import Header from "../layouts/Header";
function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-center items-center sm:py-12">
        <h1>Welcome to the Home Page</h1>
        <p>This is the main page of the application.</p>
      </div>
    </>
  );
}
export default Home;