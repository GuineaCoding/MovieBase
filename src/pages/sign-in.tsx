// import React, { useState } from 'react';
// import { supabase } from '../supbase';

// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const { error } = await supabase.auth.signIn({ email, password });
//     if (error) {
//       setMessage('Error signing in: ' + error.message);
//     } else {
//       setMessage('Check your email for the login link!');
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Loading...' : 'Sign In'}
//         </button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default SignIn;
