// src/components/Badge.jsx
import React from 'react';

const Badge = ({ children, color = 'blue', className = '' }) => {
 const colorClasses = {
   blue: 'bg-blue-100 text-blue-800',
   red: 'bg-red-100 text-red-800',
   green: 'bg-green-100 text-green-800',
   yellow: 'bg-yellow-100 text-yellow-800',
   gray: 'bg-gray-100 text-gray-800',
 };

 return (
   <span
     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]} ${className}`}
   >
     {children}
   </span>
 );
};

export default Badge;