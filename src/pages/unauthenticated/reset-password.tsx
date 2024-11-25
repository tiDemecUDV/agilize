import {
  AuthError,
  confirmResetPassword,
  resetPassword,
} from '@aws-amplify/auth'
import { KeyIcon } from '@heroicons/react/16/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { PasswordInfo } from '@/components/password-info'

export const resetPasswordForm = z
  .object({
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    code: z
      .string()
      .min(1, 'Código de confirmação é obrigatório')
      .length(6, 'Código de confirmação deve ter 6 caracteres'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(7, 'Mínimo de 7 caracteres'),
    confirmPassword: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(7, 'Mínimo de 7 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  })

type ResetPasswordForm = z.infer<typeof resetPasswordForm>

export function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [isLoadingResend, setIsLoadingResend] = useState(false)

  const email = searchParams.get('email') ?? ''

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordForm),
    defaultValues: {
      email,
    },
  })

  async function handleResetPassword(data: ResetPasswordForm) {
    await confirmResetPassword({
      username: data.email,
      confirmationCode: data.code,
      newPassword: data.password,
    })
      .then(() => {
        toast.success('Senha alterada com sucesso.')
        navigate('/', { replace: true })
      })
      .catch((err) => {
        switch (err.message) {
          case 'Invalid verification code provided, please try again.':
            setError('code', {
              type: 'validate',
              message: 'Código de confirmação inválido.',
            })
            toast.error('Código de confirmação inválido.')
            break
          default:
            toast.error('Erro inesperado, tente novamente mais tarde.')
            navigate('/')

            return
        }

        toast.error('Erro inesperado, tente novamente mais tarde.')
        navigate('/')
      })
  }

  async function handleResendCode() {
    try {
      setIsLoadingResend(true)

      const { nextStep } = await resetPassword({ username: email })

      if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
        toast.success('Código de confirmação reenviado.')
      }
    } catch (err) {
      if (err instanceof AuthError) {
        switch (err.message) {
          case 'Username/client id combination not found.':
            toast.error('Usuário não encontrado.')
            break
          case 'Attempt limit exceeded, please try after some time.':
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
    } finally {
      setIsLoadingResend(false)
    }
  }

  useEffect(() => {
    if (!email) {
      navigate('/recuperar-senha')
    }
  }, [email, navigate])

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
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
          required
          disabled
          {...register('email')}
        />

        <Input
          id="code"
          type="text"
          label="Código de confirmação"
          placeholder="Código de confirmação"
          errorMessage={errors.code?.message}
          autoFocus
          required
          {...register('code')}
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

        <Input
          id="confirmPassword"
          type="password"
          label="Confirmação de senha"
          placeholder="••••••••"
          errorMessage={errors.confirmPassword?.message}
          required
          {...register('confirmPassword')}
        />

        <button
          type="button"
          onClick={handleResendCode}
          disabled={isLoadingResend}
          className="flex items-center gap-1 self-end font-medium text-primary hover:text-sky-700 disabled:text-primary hover:underline disabled:no-underline disabled:cursor-not-allowed transition duration-300"
        >
          {isLoadingResend && (
            <div className="size-4 border-2 border-transparent border-t-primary border-r-primary rounded-full animate-spin" />
          )}
          Reenviar código
        </button>
      </fieldset>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2 sm:ml-34">
        <Button
          type="submit"
          icon={<KeyIcon className="size-4" />}
          isLoading={isSubmitting}
        >
          Confirmar
        </Button>

        <Link
          to="/"
          className="font-medium text-primary hover:text-sky-700 hover:underline transition duration-300"
        >
          Voltar para o login
        </Link>
      </div>
    </form>
  )
}
