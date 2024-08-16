// // src/components/SignUp.js
// import React, { useState } from 'react';
// import { supabase } from '../supbase';

// const SignUp = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const { error } = await supabase.auth.signUp({ email, password });
//     if (error) {
//       setMessage('Error signing up: ' + error.message);
//     } else {
//       setMessage('Registration successful, check your email to confirm your account!');
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSignUp}>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Loading...' : 'Sign Up'}
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default SignUp;
