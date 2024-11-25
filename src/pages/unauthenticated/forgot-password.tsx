import { AuthError, resetPassword } from '@aws-amplify/auth'
import { EnvelopeIcon } from '@heroicons/react/16/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/button'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { PasswordInfo } from '@/components/password-info'

export const forgotPasswordForm = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
})

type ForgotPasswordForm = z.infer<typeof forgotPasswordForm>

export function ForgotPassword() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordForm),
  })

  async function handleForgotPassword(data: ForgotPasswordForm) {
    try {
      const { nextStep } = await resetPassword({ username: data.email })

      if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
        toast.success('Código de confirmação enviado.')
        navigate(`/reset-password?email=${data.email}`)
      }
    } catch (err) {
      if (err instanceof AuthError) {
        switch (err.message) {
          case 'Username/client id combination not found.':
            setError('email', {
              type: 'validate',
              message: 'Usuário não encontrado.',
            })
            toast.error('Usuário não encontrado.')
            break
          case 'Attempt limit exceeded, please try after some time.':
            setError('email', {
              type: 'validate',
              message:
                'Limite de tentativas excedido, tente novamente mais tarde.',
            })
            toast.error(
              'Limite de tentativas excedido, tente novamente mais tarde.',
            )
            break
          default:
            toast.error('Erro inesperado, tente novamente mais tarde.')
            navigate('/')
        }
      }

      toast.error('Erro inesperado, tente novamente mais tarde.')
    }
  }

  return (
    <div className="w-full max-w-[720px] max-h-[80%] flex flex-col">
      <main className="border-[0.5px] border-gray-100 shadow-lg rounded-xl overflow-y-auto">
        <Header />

        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="flex flex-col gap-4 p-6"
        >
          <PasswordInfo />

          <fieldset className="flex flex-col gap-3 py-2">
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
          </fieldset>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2 sm:ml-34">
            <Button
              type="submit"
              icon={<EnvelopeIcon className="size-4" />}
              isLoading={isSubmitting}
            >
              Enviar Link
            </Button>

            <Link
              to="/"
              className="font-medium text-primary hover:text-sky-700 hover:underline transition duration-300"
            >
              Voltar para o login
            </Link>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  )
}
