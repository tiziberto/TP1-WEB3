// Clave para localStorage [cite: 69]
const STORAGE_KEY = 'user_session';

const mockUser = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Usuario Prueba'
};

// -----------------------------------------------------
// Funciones de Estado y Persistencia
// -----------------------------------------------------

/** Restaura el estado desde localStorage al recargar [cite: 69] */
export const getActiveUser = () => {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

/** Guarda el estado de la sesión [cite: 69] */
const saveSession = (user) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

// -----------------------------------------------------
// Funciones de Autenticación
// -----------------------------------------------------

/** Simula el inicio de sesión (llamada a servicio mock) [cite: 52] */
export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Simular latencia de red
      if (email === mockUser.email && password === mockUser.password) {
        const user = { email: mockUser.email, name: mockUser.name };
        saveSession(user); // Persistencia en localStorage [cite: 69]
        resolve(user);
      } else {
        // Manejo de errores de credenciales [cite: 70]
        reject(new Error('Credenciales incorrectas.'));
      }
    }, 1000);
  });
};

/** Cierre de sesión [cite: 64] */
export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
  // Opcional: recargar la página para limpiar el estado
  window.location.reload(); 
};