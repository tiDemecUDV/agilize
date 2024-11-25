import { AuthError, signIn } from '@aws-amplify/auth'
import { IdentificationIcon } from '@heroicons/react/16/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/button'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { PasswordInfo } from '@/components/password-info'

export const signInForm = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(7, 'Mínimo de 7 caracteres'),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  async function handleSignIn(data: SignInForm) {
    try {
      const { isSignedIn } = await signIn({
        username: data.email,
        password: data.password,
      })

      if (isSignedIn) {
        toast.success('Usuário autenticado com sucesso.')
        window.location.reload()
      }

      // TODO: Add when MFA configured (nextStep provided by .then)
      // const mustConfirmCodeMFA =
      //   nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE'

      // if (mustConfirmCodeMFA) {
      //   toast.success('Código de confirmação enviado.')
      //   navigate('/segundo-fator-autenticacao')
      // }
    } catch (err) {
      if (err instanceof AuthError) {
        switch (err.message) {
          case 'Incorrect username or password.':
            setError('password', {
              type: 'validate',
              message: 'E-mail ou senha incorretos.',
            })
            toast.error('E-mail ou senha incorretos.')
            break
          case 'PreAuthentication failed with error FORBIDDEN_ACCESS.':
            setError('password', {
              type: 'validate',
              message: 'Esse usuário não é autorizado.',
            })
            toast.error('Esse usuário não é autorizado.')
            break
          default:
            toast.error('Erro inesperado, tente novamente mais tarde.')
        }

        return
      }

      toast.error('Erro inesperado, tente novamente mais tarde.')
    }
  }

  return (
    <div className="w-full max-w-[720px] max-h-[80%] flex flex-col">
      <main className="border-[0.5px] border-gray-100 shadow-lg rounded-xl overflow-y-auto">
        <Header />

        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="flex flex-col gap-4 p-6"
        >
          <PasswordInfo />

          <fieldset className="flex flex-col gap-3">
            <Input
              id="email"
              type="email"
              label="E-mail do Reuni"
              placeholder="E-mail do Reuni"
              errorMessage={errors.email?.message}
              autoFocus
              required
              {...register('email')}
            />

            <Input
              id="password"
              type="password"
              label="Senha"
              placeholder="••••••••"
              errorMessage={errors.password?.message}
              required
              {...register('password')}
            />
          </fieldset>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2 sm:ml-34">
            <Button
              type="submit"
              icon={<IdentificationIcon className="size-4" />}
              isLoading={isSubmitting}
            >
              Entrar
            </Button>

            <Link
              to="/forgot-password"
              className="font-medium text-primary hover:text-sky-700 hover:underline transition duration-300"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
