import { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import UserContext from '../components/UserContext';

export default function Users() {
  const initialUsers = useLoaderData();
  const [state, setState] = useState(initialUsers);
  const { updateUser } = useContext( UserContext );
  
  console.log(state)

  const handleClick = ( id ) =>
  {
    console.log( "Attempting to delete user with ID:", id );

    fetch( `http://localhost:3000/users/${id}`, { method: 'DELETE' } )
      .then( res => res.json() )
      .then( data =>
      {
        if ( data.deletedCount === 1 )
        {
          const updatedUsers = state.filter( user => user._id !== id );
          setState( updatedUsers );
          console.log( "User deleted successfully" );
        } else
        {
          console.log( "No user found or already deleted" );
        }
      } )
      .catch( error =>
      {
        console.error( "Error deleting user:", error );
      } );
  };



  return (
    <div>
      <div>
        <Link to={'/'}>
           <button>
          Back To Home
        </button>
        </Link>
      </div>
      { state?.map( ( user, index ) => (
        <div key={ index } style={ {
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
          margin: '10px 0',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          width: '300px',
          fontFamily: 'Arial, sans-serif',
        } }>
          <h2 style={ {
            fontSize: '1.2rem',
            margin: '0 0 5px 0',
            color: '#333',
          } }>{ user.name }</h2>
          <p style={ {
            fontSize: '1rem',
            margin: '0',
            color: '#666',
          } }>{ user.email }</p>
          <Link to="/">
            <button
              style={ {
                color: 'yellow',
                padding: '3px',
                backgroundColor: 'green',
              } }
              onClick={ () => updateUser( user ) } 
            >
              Update
            </button>
          </Link>
          <button
            onClick={ () =>
            {
              handleClick( user._id )
            } }
            style={ {
              color: 'green',
              padding: '3px',
              backgroundColor: 'yellow',
            } }
          >
            X
          </button>
        </div>
      ) ) }
      {
        state.length === 0 && (
          <p>no users!!</p>
        )
      }
    </div>
  );
}