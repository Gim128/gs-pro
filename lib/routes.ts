
export const LOGIN = '/auth/login';
export const ROOT = '/';

export const PUBLIC_ROUTES = [
    '/auth/login',
    '/auth/signup',
    '/api/auth/callback/google',
    '/api/auth/callback/github',
]

export const PROTECTED_SUB_ROUTES = [
    '/checkout',
]

export const ADMIN_ONLY_ROUTES = [
    'product'
]
