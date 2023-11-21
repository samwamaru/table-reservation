import { useState, useEffect } from 'react';
import { useRegisterMutation, useRegisterPatientMutation } from '../slices/userApiSlice';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import {  FaEye, FaEyeSlash } from 'react-icons/fa';
import loginWithGoogle from '../../utils/getGoogleUrl';
import { useDispatch , useSelector} from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";


const Register = () => {
  const [name, setName] = useState('');
  const [  specialty,setSpecialty] =useState("")
const [dob,setDob] = useState("")
const [address,setAddress] = useState("")
const [mobile,setMobile] = useState("")
const [bloodGroup,setBloodGroup] = useState("")
const [contactPerson,setContactPerson] = useState("")
const [diseases,setDiseases] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    value: '',
    isTouched: false,
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);

  const handleDoctorClick = () => {
    setShowDoctorForm(true);
    setShowPatientForm(false);
  };

  const handlePatientClick = () => {
    setShowDoctorForm(false);
    setShowPatientForm(true);
  };

  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const [registerPatient, { isLoading: isPatientLoading, isError: isPatientError }] = useRegisterPatientMutation();

  const {userInfo} = useSelector((state)=> state.auth)

   const navigate = useNavigate();
  const dispatch = useDispatch();

  const today = new Date()

  useEffect(() => {
    if (userInfo && !isError && !error) {
      navigate('/');
    }
  }, [userInfo, navigate, isError,error]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordValue = password.value.toString();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

    if (password.value !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    if (!passwordRegex.test(password.value)) {
      setPasswordError(true);
      return;
    }
  

    try {
      const res = await register({ name, email, password:passwordValue,   specialty }).unwrap();
      
    dispatch(setCredentials({...res }));

    navigate('/');
      console.log("doctor res",res);

      setName('');
     
      setEmail('');
      setPassword({ value: '', isTouched: false });
      setConfirmPassword('');
      setPasswordMatchError(false);
      setPasswordError(false);
      setSpecialty("")
      toast.success ("success")
      // Additional actions after successful registration
    } catch (error) {

      toast.error(error.data.message || error.error);
      // Check if the error is due to email already existing
      
    }
  };
  const handlePatientRegister = async (e) => {
    e.preventDefault();
    const passwordValue = password.value.toString();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;

    if (password.value !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    if (!passwordRegex.test(password.value)) {
      setPasswordError(true);
      return;
    }
  

    try {
      const result = await registerPatient({   name, dob, mobile, email, bloodGroup, address, diseases, contactPerson, password:passwordValue }).unwrap();
      
    dispatch(setCredentials({...result }));

    navigate('/');
      console.log(result);

      setName('');
     
      setEmail('');
      setPassword({ value: '', isTouched: false });
      setConfirmPassword('');
      setPasswordMatchError(false);
      setPasswordError(false);
      setAddress("")
      setDiseases("")
      setContactPerson("")
      setBloodGroup("")
      setDob("")
      setMobile("")

      
      // Additional actions after successful registration
    } catch (error) {

      toast.error(error.data.message || error.error);
      // Check if the error is due to email already existing
      
    }
  };

  // function handleGoogleLogin() {
  //   loginWithGoogle().then((user) => {
  //     dispatch(setCredentials(user));
  //     localStorage.setItem('userInfo', JSON.stringify(user)); // Set the user info in local storage
  //     navigate('/');
  //   });
  // }

  const PasswordErrorMessage = () => {
    return (
      <p className="text-red-500 text-sm mb-2">
        Password should have at least 8 characters and contain at least one special character, one number, and one letter.
      </p>
    );
  };

  const PasswordMatchErrorMessage = () => {
    return (
      <p className="text-red-500 text-sm mb-2">
        Passwords do not match
      </p>
    );
  };

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
          <button
            onClick={handleDoctorClick}
            className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            Doctor
          </button>
          <button
            onClick={handlePatientClick}
            className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            Patient
          </button>
        {showDoctorForm && (
 <div className=" bg-white p-8 rounded shadow-lg">
 <h1 className="text-4xl font-bold mb-8 text-center text-red-900">Top hill</h1>
 <p className="text-center text-gray-900 py-4">
 Have an account?{' '}
 <Link to="/login" className="text-blue-500">
   <span className='text-tale-300'>Log in now</span>
 </Link>
</p>
{/* <div className="flex items-center justify-center mb-4">
<button
className="flex items-center text-gray-900 font-bold py-2 px-4 rounded space-x-2 sm:text-lg sm:py-3 sm:px-6"
onClick={handleGoogleLogin}
>
<FcGoogle className="mr-6 bg bg-white text-xl" />
<span className="ml-2 px-4">Google</span>
</button>
</div> */}

 <div className="flex items-center justify-center mb-4">
<hr className="w-1/4 border-gray-300 my-0" />
<p className="text-center text-sm mx-2">or </p>
<hr className="w-1/4 border-gray-300 my-0" />
</div>

 <form onSubmit={handleRegister} className="flex flex-col items-center p-6 bg-white rounded-lg">
<div className="w-full max-w-sm">
<div className="mb-4">
<label htmlFor="name" className="text-sm font-semibold text-gray-900">
 Name <sup className="text-red-500">*</sup>
</label>
<input
 type="text"
 id="name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="First name"
 className=" rounded px-3 py-2 w-full text-gray-900"
/>
</div>

<div className="mb-4">
<label htmlFor="email" className="text-sm font-semibold text-gray-900">
 Email address <sup className="text-red-500">*</sup>
</label>
<input
 type="email"
 id="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Email address"
 className="border  rounded px-3 py-2 w-full text-gray-900"
/>
</div>
<div className="mb-4">
<label htmlFor="email" className="text-sm font-semibold text-gray-900">
 Speciality <sup className="text-red-500">*</sup>
</label>
<input
 type="speciality"
 id="speciality"
 value={specialty}
 onChange={(e) => setSpecialty(e.target.value)}
 placeholder="speciality"
 className="border  rounded px-3 py-2 w-full text-gray-900"
/>
</div>

<div className="mb-4">
<label htmlFor="password" className="text-sm font-semibold text-gray-900">
 Password <sup className="text-red-500">*</sup>
</label>
<div className="relative">
 <input
   type={showPassword ? "text" : "password"}
   id="password"
   value={password.value}
   onChange={(e) =>
     setPassword({ ...password, value: e.target.value })
   }
   onBlur={() => setPassword({ ...password, isTouched: true })}
   placeholder="Password"
   className="border  rounded px-3 py-2 w-full pr-10 text-gray-900"
   
 />
 <div
   className="absolute right-0 top-0 mt-2 mr-3 cursor-pointer"
   onClick={() => setShowPassword(!showPassword)}
 >
   {showPassword ? <FaEyeSlash className="text-blue-200" /> : <FaEye className="text-blue-200" />}
 </div>
</div>
{password.isTouched && password.value.length < 8 && (
 <PasswordErrorMessage />
)}
{passwordError && <PasswordErrorMessage />}
</div>

<div className="mb-4">
<label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-900">
 Confirm Password <sup className="text-red-500">*</sup>
</label>
<div className="relative">
 <input
   type={showPassword ? "text" : "password"}
   id="confirmPassword"
   value={confirmPassword}
   onChange={(e) => {
     setConfirmPassword(e.target.value);
     setPasswordMatchError(false);
   }}
   placeholder="Confirm Password"
   className={`border ${
     passwordMatchError ? 'border-red-900' : ''
   } rounded px-3 py-2 w-full pr-10 gray-900`}
 />
 <div
   className="absolute right-0 top-0 mt-2 mr-3 cursor-pointer"
   onClick={() => setShowPassword(!showPassword)}
 >
   {showPassword ? <FaEyeSlash className="text-blue-200" /> : <FaEye className="text-blue-200" />}
 </div>
</div>
{passwordMatchError && <PasswordMatchErrorMessage />}
</div>

<button
type="submit"
disabled={isPatientLoading }
className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
>
Sign up
</button>

</div>
</form>
<hr className="my-6 w-full border-gray-200" />

</div>
        )}
        {showPatientForm && (
 <div className=" bg-white md:p-8 rounded shadow-lg">
 <h1 className="text-4xl font-bold mb-8 text-center text-red-900">Top hill</h1>
 <p className="text-center text-gray-900 py-4">
 Have an account?{' '}
 <Link to="/login" className="text-blue-500">
   <span className='text-tale-300'>Log in now</span>
 </Link>
</p>
{/* <div className="flex items-center justify-center mb-4">
<button
className="flex items-center text-gray-900 font-bold py-2 px-4 rounded space-x-2 sm:text-lg sm:py-3 sm:px-6"
onClick={handleGoogleLogin}
>
<FcGoogle className="mr-6 bg bg-white text-xl" />
<span className="ml-2 px-4">Google</span>
</button>
</div> */}

 <div className="flex items-center justify-center mb-4">
<hr className="w-1/4 border-gray-300 my-0" />
<p className="text-center text-sm mx-2">or </p>
<hr className="w-1/4 border-gray-300 my-0" />
</div>

 <form onSubmit={handlePatientRegister} className="flex flex-col items-center p-6 bg-white rounded-lg">
<div className="w-full max-w-sm">
<div className="mb-4">
<label htmlFor="name" className="text-sm font-semibold text-gray-900">
 Name <sup className="text-red-500">*</sup>
</label>
<input
 type="text"
 id="name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="First name"
 className=" rounded px-3 py-2 w-full text-gray-900"
/>
</div>

<div className="mb-4">
<label htmlFor="email" className="text-sm font-semibold text-gray-900">
 Email address <sup className="text-red-500">*</sup>
</label>
<input
 type="email"
 id="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Email address"
 className="border  rounded px-3 py-2 w-full text-gray-900"
/>
</div>
<div className="mb-4">
                    <label
                      htmlFor="dob"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      D.O.B
                    </label>
                    <DatePicker
                      id="date"
                      selected={dob}
                      onChange={(dob) => setDob(dob)}
                      className="w-full border-none border-b-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholderText="Select date"
                      dateFormat="yyyy-MM-dd"
                      minDate={today}
                    />
                  </div>

<div className="mb-4">
<label htmlFor="password" className="text-sm font-semibold text-gray-900">
 Password <sup className="text-red-500">*</sup>
</label>
<div className="relative">
 <input
   type={showPassword ? "text" : "password"}
   id="password"
   value={password.value}
   onChange={(e) =>
     setPassword({ ...password, value: e.target.value })
   }
   onBlur={() => setPassword({ ...password, isTouched: true })}
   placeholder="Password"
   className="border  rounded px-3 py-2 w-full pr-10 text-gray-900"
   
 />
 <div
   className="absolute right-0 top-0 mt-2 mr-3 cursor-pointer"
   onClick={() => setShowPassword(!showPassword)}
 >
   {showPassword ? <FaEyeSlash className="text-blue-200" /> : <FaEye className="text-blue-200" />}
 </div>
</div>
{password.isTouched && password.value.length < 8 && (
 <PasswordErrorMessage />
)}
{passwordError && <PasswordErrorMessage />}
</div>

<div className="mb-4">
<label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-900">
 Confirm Password <sup className="text-red-500">*</sup>
</label>
<div className="relative">
 <input
   type={showPassword ? "text" : "password"}
   id="confirmPassword"
   value={confirmPassword}
   onChange={(e) => {
     setConfirmPassword(e.target.value);
     setPasswordMatchError(false);
   }}
   placeholder="Confirm Password"
   className={`border ${
     passwordMatchError ? 'border-red-900' : ''
   } rounded px-3 py-2 w-full pr-10 gray-900`}
 />
 <div
   className="absolute right-0 top-0 mt-2 mr-3 cursor-pointer"
   onClick={() => setShowPassword(!showPassword)}
 >
   {showPassword ? <FaEyeSlash className="text-blue-200" /> : <FaEye className="text-blue-200" />}
 </div>
</div>
{passwordMatchError && <PasswordMatchErrorMessage />}
</div>

<div className="mb-4">
<label htmlFor="mobile" className="text-sm font-semibold text-gray-900">
 mobile <sup className="text-red-500">*</sup>
</label>
<input
 type="text"
 id="mobile"
 value={mobile}
 onChange={(e) => setMobile(e.target.value)}
 placeholder="Mobile"
 className=" rounded px-3 py-2 w-full text-gray-900"
/>
</div>
<div className="mb-4">
<label htmlFor="bloodGroup" className="text-sm font-semibold text-gray-900">
 Blood group <sup className="text-red-500">*</sup>
</label>
<input
 type="text"
 id="mobile"
 value={bloodGroup}
 onChange={(e) => setBloodGroup(e.target.value)}
 placeholder="Blood group"
 className=" rounded px-3 py-2 w-full text-gray-900"
/>
</div>
<div className="mb-4">
<label htmlFor="address" className="text-sm font-semibold text-gray-900">
 Adress<sup className="text-red-500">*</sup>
</label>
<input
 type="text"
 id="Adress"
 value={address}
 onChange={(e) => setAddress(e.target.value)}
 placeholder="Address"
 className=" rounded px-3 py-2 w-full text-gray-900"
/>
</div>
<div className="mb-4">
<label htmlFor="contactPerson" className="text-sm font-semibold text-gray-900">
 Emergency contact<sup className="text-red-500">*</sup>
</label>
<input
 type="text"
 id="contactPerson"
 value={contactPerson}
 onChange={(e) => setContactPerson(e.target.value)}
 placeholder="contactPerson"
 className=" rounded px-3 py-2 w-full text-gray-900"
/>
</div>
<div className="mb-4">
<label htmlFor="diseases" className="text-sm font-semibold text-gray-900">
 Diseases (optional)
</label>
<input
 type="text"
 id="diseases"
 value={diseases}
 onChange={(e) => setDiseases(e.target.value)}
 placeholder="diseases"
 className=" rounded px-3 py-2 w-full text-gray-900"
/>
</div>
<button
type="submit"
disabled={isLoading }
className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
>
Sign up
</button>

</div>
</form>
<hr className="my-6 w-full border-gray-200" />

</div>
        )}
     
    </div>
  );
};

export default Register;
