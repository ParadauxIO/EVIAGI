import { useState, useEffect } from 'react'
import { Auth as AuthComponent } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../state/supabase'
import "./Auth.scss"

export default function Auth() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className='auth'>
      <div className='container'>
        <h1> Login or Signup</h1>
        {
          !session ? 
            <AuthComponent
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google']}
            /> : 
            <div>You've already logged in.</div>
        }
      </div>
    </div>
  )
}