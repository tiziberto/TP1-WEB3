const STORAGE_KEY = 'user_session';

const mockUser = {
  email: 'usuario@gmail.com',
  password: 'clave1234',
  name: 'Usuario de Prueba'
};

export const getActiveUser = () => {
  const user = localStorage.getItem(STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

const saveSession = (user) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

//simula inicion de sesion
export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      if (email === mockUser.email && password === mockUser.password) {
        const user = { email: mockUser.email, name: mockUser.name };
        saveSession(user);
        resolve(user);
      } else {
        reject(new Error('Credenciales incorrectas.'));
      }
    }, 1000);//el timeout es para simular la latencia de red.
  });
};

export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload(); 
};