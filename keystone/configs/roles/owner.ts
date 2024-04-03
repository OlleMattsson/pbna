import { Session } from '../types';

export const isOwner = ({ session } : {session: Session}) => {
    if (session?.data.role === 'owner') {
      return true
    } 
    
    return false
  }