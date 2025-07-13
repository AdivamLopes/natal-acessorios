'use client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { User, Mail, Key, LogOut } from 'lucide-react';

const Profile = () => {
    const auth = useAuth();
    const user = auth?.user ?? null;
    const login = auth?.login ?? (() => { });
    const logout = auth?.logout ?? (() => { });
    const isAuthenticated = auth?.isAuthenticated ?? false;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Erro de Cadastro",
        description: "Por favor, preencha todos os campos.",
      });
      return;
    }
    login({ name: formData.name, email: formData.email });
    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Seus dados foram salvos localmente. Para uma experiência completa, considere o cadastro online.",
    });
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-tan/10 py-12">
        <Helmet>
          <title>Meu Perfil - Natal Acessórios</title>
          <meta name="description" content="Gerencie suas informações e veja seus pedidos na Natal Acessórios." />
        </Helmet>
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
          >
            <h1 className="text-4xl font-display font-bold gradient-text mb-4">
              Bem-vinda, {user.name}!
            </h1>
            <p className="text-gray-600 mb-6">
              Estamos felizes em te ver por aqui.
            </p>
            <div className="text-left space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-tan-dark" />
                <span className="text-gray-700">{user.name}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-tan-dark" />
                <span className="text-gray-700">{user.email}</span>
              </div>
            </div>
            <Button
              onClick={logout}
              size="lg"
              className="bg-carmine hover:bg-carmine-light text-white w-full"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Seus dados estão salvos apenas neste dispositivo. Para salvar seus dados de forma permanente, por favor, solicite a integração com nosso sistema de contas online.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tan/10 py-12 flex items-center">
      <Helmet>
        <title>Crie sua Conta - Natal Acessórios</title>
        <meta name="description" content="Crie sua conta para uma experiência de compra personalizada na Natal Acessórios." />
      </Helmet>
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold gradient-text">
              Crie sua Conta
            </h1>
            <p className="text-gray-600 mt-2">
              Junte-se a nós e brilhe ainda mais.
            </p>
          </div>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Nome Completo"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tan"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tan"
              />
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Senha"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tan"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full bg-carmine hover:bg-carmine-light text-white text-base py-6"
            >
              Criar Conta
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;