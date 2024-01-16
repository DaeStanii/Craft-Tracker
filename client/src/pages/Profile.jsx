import Auth from '../utils/auth';

const Profile = () => {

    return (
        <div className='text-center'>
            <h3>
                Welcome to your profile {Auth.getProfile().data.username}!
            </h3>
        </div>
    )
}

export default Profile;