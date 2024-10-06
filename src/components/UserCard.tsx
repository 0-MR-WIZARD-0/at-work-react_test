import React from 'react'
import styles from "./UserCard.module.scss"
import { Link } from 'react-router-dom';

interface UserCardProps {
  user: {
    id: number;
    username: string;
    address: { city: string };
    company: { name: string };
  };
  onArchive: () => void;
  onHide: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onArchive, onHide }) => {
    return (
        <div className={styles.card_wrapper}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Company:</strong> {user.company.name}</p>
          <img src="https://via.placeholder.com/150" alt="avatar" />
          <div>
            <Link to={`/edit/${user.id}`}>Edit</Link>
            <Link to="" onClick={onArchive}>Archive</Link>
            <Link to="" onClick={onHide}>Hide</Link>
          </div>
        </div>
      );
}

export default UserCard