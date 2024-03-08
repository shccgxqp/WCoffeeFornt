import { useContext } from 'react';
import { AuthContext } from './AuthProvider'; // Adjust the import path as necessary

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
