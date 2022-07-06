/**Hook de autenticação do usuário **/

import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect
} from 'react';

import { api } from '../services/api';
import { database } from '../databases';
import { User as ModelUser } from '../databases/model/User';

//tipagem das informações do usuário
interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

//interface do contexto
interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updatedUser: (user: User) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      const { token, user } = response.data;
      //todas as requisições que usuário fizer, ja tem esse token no cabeçalho da requisição
      //Rotas autenticadas
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      //Persistindo os dados do usuário no bando de dados WatermelonDB
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        await userCollection.create((newUser) => {
          newUser.user_id = user.id,
            newUser.name = user.name,
            newUser.email = user.email,
            newUser.avatar = user.avatar,
            newUser.driver_license = user.driver_license,
            newUser.token = token;
        })
      })
      setData({ ...user, token });

    } catch (error) {
      throw new Error(error)
    }
  }

  //Identificar o usuário e remover ele permanente
  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      throw new Error(error);
    }
  }

  //Atualizar os dados do usuário
  async function updatedUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          userData.name = user.name,
            userData.driver_license = user.driver_license,
            userData.avatar = user.avatar
        });
      });
      setData(user);

    } catch (error) {
      throw new Error(error);
    }
  }
  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        setData(userData);
      }
    }
    loadUserData();
  }, [])


  return (
    <AuthContext.Provider value={{
      user: data,
      signIn,
      signOut,
      updatedUser
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