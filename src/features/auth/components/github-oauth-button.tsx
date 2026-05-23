import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { FaGithub } from 'react-icons/fa'

const GithubOauthButton = () => {

    const githubAuthHandler = async() => {
        await authClient.signIn.social({
            provider: "github"
        })
    }
  return (
    <Button variant="outline" onClick={githubAuthHandler} className='w-full mt-2'>
      <FaGithub />
      <span>Login With GitHub</span> 
    </Button>
  )
}

export default GithubOauthButton