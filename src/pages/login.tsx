import { useState } from "react"
import { useSession } from "../contexts/auth-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { LoginFormData, loginSchema } from "../schemas/login-schema"
import { Button, Input, Text, Heading, InputGroup } from "@chakra-ui/react"
import { LuUser } from "react-icons/lu"
import { PasswordInput } from "../components/ui/password-input"
import logo from "/image/unibalsas-mini-logo.png"

export default function LoginPage() {
  const { signIn } = useSession()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null)
    setLoading(true)
    try {
      await signIn(data)
      navigate("/")
    } catch (err: any) {
      setErrorMessage(
        err?.message ?? "Falha no login. Verifique suas credenciais."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[600px] w-[400px] bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center gap-10 h-full w-[80%]">
          <div className="flex flex-col items-start justify-center w-full gap-3">
            <div className="flex flex-col justify-end items-start w-full flex-[0.4] pb-5">
              <div className="p-2.5 border-2 border-[#E8ECF4] rounded-[10px] bg-white shadow-[0_2px_3px_rgba(0,0,0,0.2)]">
                <div className="w-[40px] h-[40px] flex items-center justify-center rounded-[20px] border border-[#000000]   ">
                  <img
                    src={logo}
                    alt="Unibalsas Logo"
                    className="w-[30px] h-[30px]"
                  />
                </div>
              </div>
            </div>

            <Heading
              size="2xl"
              fontFamily="Poppins, sans-serif"
              fontWeight="bold"
              className="text-[#9D3234]">
              UB Task
            </Heading>

            <Heading
              size="md"
              fontFamily="Poppins, sans-serif"
              fontWeight="normal"
              className="text-[#838BA1]">
              Bem-vindo(a) ao seu novo aplicativo de listagem de ativdades da
              Unibalsas!{" "}
            </Heading>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-center gap-5 w-full">
            <Controller
              name="login"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputGroup startElement={<LuUser />}>
                  <Input
                    color="#505056"
                    placeholder="E-mail ou R.A"
                    {...field}
                  />
                </InputGroup>
              )}
            />
            {errors.login && (
              <Text color="red.500" fontSize="sm">
                {errors.login.message}
              </Text>
            )}

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PasswordInput placeholder="Senha" {...field} />
              )}
            />
            {errors.password && (
              <Text color="red.500" fontSize="sm">
                {errors.password.message}
              </Text>
            )}

            <Button
              type="submit"
              loading={loading}
              bg="#9D3234"
              color="white"
              className="w-full"
              fontFamily="Poppins, sans-serif"
              fontWeight="bold">
              Entrar Agora
            </Button>

            {errorMessage && (
              <Text color="red.500" fontSize="sm">
                {errorMessage}
              </Text>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
