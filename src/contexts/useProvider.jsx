import { useContext } from 'react';
import { AuthContext } from './AuthProvider'; // Adjust the import path as necessary
import { StateContext } from './ContextProvider';
// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
export const useStateContext = () => useContext(StateContext);
