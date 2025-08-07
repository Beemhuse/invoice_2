'use client';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Set a cookie (default: expires in 7 days)
export const setCookie = (
  name: string,
  value: string,
  options?: any
) => {
  cookies.set(name, value, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    ...options,
  });
};

// Get a cookie
export const getCookie = (name: string): string | undefined => {
  return cookies.get(name);
};

// Remove a cookie
export const deleteCookie = (name: string, options: any = {}) => {
  cookies.remove(name, { path: '/', ...options });
};
