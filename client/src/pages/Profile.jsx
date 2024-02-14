import { Navigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../utils/queries';

const Profile = () => {

    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user?.username) {
        return (
            <h3> You need to be logged in to see this. Please use the navigation links above to sign up or log in!</h3>
        );
    }

    return (
        <div className='text-center'>
            <h3>
                Welcome to your profile {Auth.getProfile().data.username}!
            </h3>
        </div>
    )
}

export default Profile;