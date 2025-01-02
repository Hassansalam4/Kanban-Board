import {jwtDecode,  JwtPayload}from 'jwt-decode';

class AuthService {
  // Get the decoded token (user profile)
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (e) {
        console.error("Invalid token", e);
        return null;
      }
    }
    return null;
  }

  // Check if the user is logged in (based on the existence of a token)
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // User is logged in if there's a token and it's not expired
  }

  // Check if the token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp) {
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp < currentTime;
      }
      return false;
    } catch (e) {
      console.error("Error decoding token", e);
      return true;
    }
  }

  // Get the JWT token from localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Log the user in by storing the token and redirecting
  login(idToken: string): void {
    localStorage.setItem('authToken', idToken); // Store the token
    window.location.href = '/'; // Redirect to the home page (or any other page)
  }

  // Log the user out by removing the token and redirecting
  logout(): void {
    localStorage.removeItem('authToken'); // Remove the token
    window.location.href = '/login'; // Redirect to the login page
  }
}

export default new AuthService();