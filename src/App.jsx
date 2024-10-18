import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleUser = ( e ) =>
  {
    e.preventDefault();

    // Perform form submission logic here
    fetch( 'http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( formData )
    } )
      .then( res => res.json() )
      .then( data =>
      {
        console.log( 'Response from server:', data );
        if ( data.insertedId )
        {
          alert( "successfully submitted" );
        }
      } )
      .catch( (error, data) =>
      {
        if ( data.acknowledged === false )
        {
          console.error( 'Error submitting data:', error );
        }
      } );

    console.log( 'Form Data:', formData );
    setFormData( {
      name: '',
      email: ''
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
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default App;