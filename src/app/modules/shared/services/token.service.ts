import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  saveToken(token: string) {
    console.log('token guardado');
    setCookie('token-ww', token, { expires: 365, path: '/' });
  }

  getToken() {
    const token = getCookie('token-ww');
    return token;
  }

  removeToken() {
    removeCookie('token-ww');
    localStorage.removeItem('token-ww');
  }

  removeRefreshToken() {
    removeCookie('refresh-token-ww');
    localStorage.removeItem('token-ww');
  }

  saveRefreshToken(token: string) {
    setCookie('refresh-token-ww', token, { expires: 365, path: '/' });
  }

  getRefreshToken() {
    const token = getCookie('refresh-token-ww');
    return token;
  }

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if (decodeToken && decodeToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode<any>(token);
      return decodedToken?.userId; // Aquí `sub` es donde típicamente está el ID del usuario
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  }
}
