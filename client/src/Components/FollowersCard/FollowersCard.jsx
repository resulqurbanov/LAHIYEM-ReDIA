import React, { useEffect, useState } from 'react'
import './FollowersCard.scss'
import User from '../User/User'
import { useSelector } from "react-redux";
import { getAllUser } from '../../api/UserRequests';
import FollowerModal from './FollowerModal/FollowerModal';


const FollowersCard = ({ location }) => {

  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);


  // userler hissesi fetch
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
      console.log(data);
    };
    fetchPersons();
  }, []);


  return (
    <div className='MiniFollowers'>
      <h3>People you may know</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

<FollowerModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
};

export default FollowersCard;