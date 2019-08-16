// import React from 'react';
// import { Route, Redirect } from "react-router-dom";

// export const ProtectedRoute = ({ component: Comp, logged, path, ...rest }) => {
//     return (
//       <Route
//         path={path}
//         {...rest}
//         render={(props) => {
//           return logged ? (
//             <Comp {...props} />
//           ) : (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: {
//                   prevLocation: path,
//                   error: "You need to login first!",
//                 },
//               }}
//             />
//           );
//         }}
//       />
//     );
//   };
