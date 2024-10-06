import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { archiveUser, hideUser, restoreUser } from "../../redux/usersSlice";
import UserCard from "../../components/UserCard";
import styles from "./main.module.scss"

const Main = () => {

  const { users, archivedUsers, status } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handleArchive = (id: number) => {
    dispatch(archiveUser(id));
  };

  const handleHide = (id: number) => {
    dispatch(hideUser(id));
  };

  const handleRestore = (id: number) => {
    dispatch(restoreUser(id));
  };

  if (status === 'loading') {
    return (
        <div className={styles.loader}>
            <h1>Loading...</h1>
        </div>
    )
  }

  return (
    <main>
        <div className={styles.wrapper}>
            <h1>Active</h1>
            {users.map((user) => (
            <UserCard
                key={user.id}
                user={user}
                onArchive={() => handleArchive(user.id)}
                onHide={() => handleHide(user.id)}
            />
            ))}
        </div>
        <div>
            <h1>Archived</h1>
            {archivedUsers.map((user) => (
            <div className={styles.card_wrapper_archive} key={user.id}>
                <p>{user.username}</p>
                <button onClick={() => handleRestore(user.id)}>Restore</button>
            </div>
            ))}
        </div>
    </main>
  )
}

export default Main