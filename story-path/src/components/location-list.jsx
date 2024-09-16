import { Link } from 'react-router-dom';
import Footer from './footer';
import Header from './header';

function LocationList() {
  return (
    <div id="root">
      <Header />

      <div className="container-custom mt-3">
        <h1>
          Locations
          <Link to="/preview">
            <button className="btn btn-success ms-4">Preview</button>
          </Link>
          <button className="btn btn-success ms-4">Print All QR Codes</button>
        </h1>

        <div className="mt-4">
          <Link to="/add-location">
            <button className="btn btn-success">Add location</button>
          </Link>
        </div>

        <table className="table table-striped mt-4">
            <tbody>
                <tr>
                  <td>
                    <div className='fw-bold fs-5'>Sample location</div>
                    <div>location info</div>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-primary me-2">Print QR Code</button>
                    <button className="btn btn-primary me-2">Edit</button>
                    <button className="btn btn-primary me-2">Delete</button>
                  </td>
                </tr>
            </tbody>
          </table>
      </div>
      
      <Footer />
    </div>
  );
}
  
export default LocationList;
