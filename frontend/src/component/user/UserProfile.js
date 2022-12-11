import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const profiles = await axios.get('http://localhost:8000/users');
      setProfiles(profiles.data);
    };
    fetchData();
  }, [profiles]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Suppliers</title>
          </Helmet>
          
      <table className="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Contact No.</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.user_id} alt={profile.unique_id}>
              <td>{profile.user_id}</td>
              <td>{profile.firstname}</td>
              <td>{profile.lastname}</td>
              <td>{profile.email}</td>
              <td>{profile.contactno}</td>
              <td>{profile.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mb-3">
        <Button>
          <Link to="/dashboard">Dashboard</Link>
        </Button>
        <br />
      </div>
    </Container>
  );
}

export default UserProfile;
