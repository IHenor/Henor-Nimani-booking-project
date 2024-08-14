import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome to Our Booking Platform
          </h1>
          <p className="mb-5">
            Easily manage and create bookings with our intuitive platform.
            Whether you're scheduling appointments or managing services, we make
            it simple and efficient for you.
          </p>
          <Link href="/pages/index">
            <button className="btn btn-primary">View Bookings</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
