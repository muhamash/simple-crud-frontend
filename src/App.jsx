import { Suspense, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../src/components/UserContext';
import './App.css';

function App() {
  const { formData, updateUser } = useContext(UserContext); 
  const navigate = useNavigate();
  console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUser({ ...formData, [name]: value });
  };

  const handleUser = (e) => {
    e.preventDefault();
    
    fetch( 'http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( formData ),
    } )
      .then( ( res ) => res.json() )
      .then( ( data ) =>
      {
        if ( data.insertedId )
        {
          alert( 'Successfully submitted' );
          updateUser( {
            name: '',
            email: '',
          } );
          navigate( '/users' );
        }
      } )
      .catch( ( error ) =>
      {
        console.error( 'Error submitting data:', error );
      } );
  };

  return (
    <div className="app-container">
      <h1>Simple CRUD FullStack App</h1>
      <form onSubmit={handleUser}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <input 
          type="submit" 
          value={formData.id? "Update" : "Submit"} 
        />
      </form>

      <Suspense fallback={<p>Loading...</p>}>
        <button onClick={() => navigate('/users')}>
          See users
        </button>
      </Suspense>
    </div>
  );
}

export default App;