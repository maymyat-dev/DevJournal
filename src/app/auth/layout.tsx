import { getSession } from "@/lib/getSession"
import { postsPath } from "@/path"
import { redirect } from "next/navigation"

interface Props {
    children: React.ReactNode
}

const AuthLayout = async({ children }: Props) => {
    const session = await getSession()
    if (session) {
        redirect(postsPath)
    }
  return (
      <>
          {children}
    </>
  )
}

export default AuthLayout