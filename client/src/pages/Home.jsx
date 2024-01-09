import Auth from "../utils/auth";

const Home = () => {
  return (
    <div className="text-center">
      {Auth.loggedIn() ? (
        <h2>The Home Page</h2>

        // Profile Crafts
        
      ) : (
        <div>
          <h2 className="text-bold">Welcome to Craft Tracker!</h2>
          <p className="text-sm">Do you have trouble remembering what colors you painted with after you have an art block? Do you ever run to the store with a million pictures of paint bottles you need refills of? Theres no need to clutter your photos anymore. You can enter in brands and colors of the mediums you use to track what you use and where you use it in your art pieces. </p>
          <h3>
            Here are a few examples of trackable crafts!
          </h3>
          <ul>
            <li>Knitting</li>
            <li>Crochet</li>
            <li>Painting</li>
            <li>Coloring</li>
            <li>Embroidery</li>
            <li>etc...</li>
          </ul>
        </div>

        // List of craft categories
      )}
    </div>
  );
};

export default Home;
