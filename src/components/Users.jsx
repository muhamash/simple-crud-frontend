import { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import UserContext from '../components/UserContext';

export default function Users() {
  const initialUsers = useLoaderData();
  const [state, setState] = useState(initialUsers);
  const { updateUser } = useContext(UserContext);

  const handleClick = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        const updatedUsers = state.filter((user) => user._id !== id);
        setState(updatedUsers);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
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
            onClick={ () => handleClick( user._id ) }
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
    </div>
  );
}