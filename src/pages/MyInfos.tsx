import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AppContext } from "../components/AppContext"

export default function MyInfos () {
  const navigate = useNavigate()
  const { isLoggedIn, user} = useContext(AppContext)

  if (!isLoggedIn) navigate('/home')

  return (
    <div>
      <h1>MyInfos</h1>
      <p>Nome: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  )
}