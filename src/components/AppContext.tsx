import { createContext, useEffect, useState } from "react"
import { login } from "../services/login"

interface IAppContext {
    user: {
      name: string,
      email: string
    } | null,
    isLoggedIn: boolean,
    signIn: (email: string, password: string) => Promise<boolean>
}
  
export const AppContext = createContext({} as IAppContext)
  
export const AppContextProvider = ({ children }: any) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null

    useEffect(() => {
      if(localStorage.getItem('user')){
        setIsLoggedIn(true)
      }
    }, [])

    const signIn = async (email: string, password: string) => {
      if (!(await login(email, password))) {
        return false
      }

      setIsLoggedIn(true)

      localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email }))

      return true
    }

    return (
      <AppContext.Provider value={{ user, isLoggedIn, signIn }}>
        { children }
      </AppContext.Provider>
    )
}
