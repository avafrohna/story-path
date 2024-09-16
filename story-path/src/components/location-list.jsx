import { Link } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

function LocationList() {
  return (
    <div id="root">
      <Header />

      <body>
        <h1 className="mt-4 ms-5">Locations</h1>

        <div className="mt-3 ms-5">
          <Link to="/add-location">
            <button className="btn btn-success">Add location</button>
          </Link>
        </div>

        <div className="mt-3 ms-5">
          <text>
            Sample Location
          </text>
        </div>
      </body>
      
      <Footer />
    </div>
  );
}
  
export default LocationList;
