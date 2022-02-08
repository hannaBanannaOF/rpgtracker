import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
    let location = useLocation();
  
    if (!auth.valid()) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }