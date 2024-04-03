import { Session } from '../types';

export const isAdmin = ({ session } : {session: Session}) => {
    if (session?.data.role === 'admin') {
      return true
    } 
    
    return false
  }