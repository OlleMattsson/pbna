import { Session } from '../types';

export const isUser = ({ session } : {session: Session}) => {
    if (session?.data.role === 'user') {
      return true
    } 
    
    return false
  }