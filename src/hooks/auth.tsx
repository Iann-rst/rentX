/**Hook de autenticação do usuário **/

import React, {
  useState,
  createContext,
  useContext,
  ReactNode
} from 'react';

import { api } from '../services/api';

//tipagem das informações do usuário
interface User {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

//interface do contexto
interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password
    });

    const { token, user } = response.data;
    //todas as requisições que usuário fizer, ja tem esse token no cabeçalho da requisição
    //Rotas autenticadas
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setData({ token, user });

  }

  return (
    <AuthContext.Provider value={{
      user: data.user,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };