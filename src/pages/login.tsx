import { useState } from 'react';
import { useSession } from '../contexts/auth-context';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { LoginFormData, loginSchema } from "../schemas/login-schema"
import { Input, InputGroup } from '@chakra-ui/react/input';
import { LuUser } from 'react-icons/lu';
import { PasswordInput } from '../components/ui/password-input';
import { Button } from '@chakra-ui/react/button';
import { ColorModeProvider } from '../components/ui/color-mode';
import { Heading, Theme } from '@chakra-ui/react';
import logo from '../../public/image/unibalsas-mini-logo.png';

export default function LoginPage() {
    const { signIn } = useSession()
    const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
            navigate('/');
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
            <div className='flex flex-col items-center justify-center h-[600px] w-[400px] bg-white rounded-lg shadow-md'>
                <div className='flex flex-col items-center justify-center gap-10 h-full w-[80%]'>
                    <div className='flex flex-col items-start justify-center w-full'>
                        <div className="p-2.5 border-2 border-gray-300 rounded-[20px] bg-white shadow-sm">
                                <img
                                    src={logo}
                                    alt="Unibalsas Logo"
                                    className='w-10 h-10 '
                                />
                        </div>
                        <Heading size="2xl" fontFamily="Poppins, sans-serif" >UB Task</Heading>
                        <Heading size="md" fontFamily="Poppins, sans-serif">Bem-vindo(a) ao seu novo aplicativo de listagem de ativdades da Unibalsas! </Heading>
                    </div>
                   
                    {/* Formulário de Login */}
                    <div className="flex flex-col items-center justify-center gap-5 w-full"> 
                        <InputGroup startElement={<LuUser />}>
                            <Input placeholder="E-mail ou R.A" />
                        </InputGroup>
                        <PasswordInput placeholder='Senha' />
                    </div>
                    
                    {/* Botão de Submissão */}
                    <div className='flex w-full justify-center'>
                        <Button
                        loading={false}
                        bg="#9D3234"
                        className="w-full"
                        >Button</Button>
                    </div>

                </div>
            </div>
        </>  
    );
}