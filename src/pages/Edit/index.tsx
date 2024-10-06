import styles from "./edit.module.scss"
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import { editUser } from "../../redux/usersSlice";
import { useForm } from "react-hook-form";

interface FormData {
    name: string;
    username: string;
    email: string;
    city: string;
    phone: string;
    companyName: string;
  }

const Edit = () => {

    const { id } = useParams<{ id: string }>();
    const userId = parseInt(id!, 10);
    const user = useAppSelector((state) => state.users.users.find(u => u.id === userId));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const [showPopup, setShowPopup] = useState(false);
  
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
  
    useEffect(() => {
      if (user) {
        setValue('name', user.username);
        setValue('username', user.username);
        setValue('email', 'email@placeholder.com');
        setValue('city', user.address.city);
        setValue('phone', '000-000-0000');
        setValue('companyName', user.company.name);
      }
    }, [user, setValue]);
  
    const onSubmit = (data: FormData) => {
      dispatch(editUser({ id: userId, updatedUser: { ...user, ...data } }));
  
      setShowPopup(true);
  
      setTimeout(() => {
        setShowPopup(false);
        navigate('/');
      }, 4000);
    };

  return (
    <div className={styles.wrapper_edit}>
      <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name:</label>
          <input {...register('name', {required: "Name is required"})} />
          {errors.name && <span style={{color: "red"}}>{errors.name.message}</span>}
        </div>
        <div>
          <label>Username:</label>
          <input {...register('username', {required: "Username is required"})} />
          {errors.username && <span style={{color: "red"}}>{errors.username.message}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...register('email',
            {
                required: "Email is required",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address'
                }
            })} />
          {errors.email && <span style={{color: "red"}}>{errors.email.message}</span>}
        </div>
        <div>
          <label>City:</label>
          <input {...register('city', {required: "City is required"})} />
          {errors.city && <span style={{color: "red"}}>{errors.city.message}</span>}
        </div>
        <div>
          <label>Phone:</label>
          <input {...register('phone', {required: "Phone is required"})} />
          {errors.phone && <span style={{color: "red"}}>{errors.phone.message}</span>}
        </div>
        <div>
          <label>Company Name:</label>
          <input {...register('companyName', {required: "Company name is required"})} />
          {errors.companyName && <span style={{color: "red"}}>{errors.companyName.message}</span>}
        </div>
        <button type="submit">Save</button>
      </form>
      {showPopup && (
        <div style={{ border: '1px solid black', padding: '10px', position: 'fixed', top: '20px', right: '20px', backgroundColor: 'lightgreen' }}>
          <p>User successfully updated!</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default Edit