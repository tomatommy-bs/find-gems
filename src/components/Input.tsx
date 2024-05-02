'use client';
import React from 'react';

export default React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({className, children, ...props}, ref) {
  return (
    <input
      ref={ref}
      type="text"
      className={`w-full rounded-lg border border-gray-200 p-2 px-4 placeholder:text-blue-400 ${className}`}
      {...props}
    >
      {children}
    </input>
  );
});
