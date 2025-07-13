'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import SSLBadge from '@/components/SSLBadge';

const Footer = () => {
    const handleFeatureClick = () => {
        toast({
            title: "🚧 Página em construção!",
            description: "Esta página ainda não foi implementada, mas você pode solicitá-la no seu próximo prompt! 🚀"
        });
    };

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        toast({
            title: "🚧 Inscrição em breve!",
            description: "A funcionalidade de newsletter ainda não foi implementada. Volte em breve! 🚀"
        });
    };

    return (
        <footer className="bg-carmine text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <img
                                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/2beba3b7-4b9d-439e-8b64-51213a0e9ec8/93c3decb51596d56f05781d880e030df.png"
                                alt="Natal Acessórios Logo com fundo transparente"
                                className="h-20 bg-white p-2 rounded-lg"
                            />
                        </Link>
                        <p className="text-white/80 text-sm leading-relaxed">
                            Jóias refinadas, únicas e atemporais para mulheres que inspiram.
                        </p>
                        <div className="flex space-x-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleFeatureClick}
                                className="text-white/80 hover:text-tan"
                            >
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleFeatureClick}
                                className="text-white/80 hover:text-tan"
                            >
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleFeatureClick}
                                className="text-white/80 hover:text-tan"
                            >
                                <Twitter className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <span className="text-lg font-semibold text-tan">Institucional</span>
                        <div className="flex flex-col space-y-2">
                            <Link href="/sobre-nos" className="text-white/80 hover:text-tan transition-colors text-sm">
                                Sobre Nós
                            </Link>
                            <button
                                onClick={handleFeatureClick}
                                className="text-left text-white/80 hover:text-tan transition-colors text-sm"
                            >
                                Blog
                            </button>
                            <button
                                onClick={handleFeatureClick}
                                className="text-left text-white/80 hover:text-tan transition-colors text-sm"
                            >
                                Política de Trocas
                            </button>
                            <button
                                onClick={handleFeatureClick}
                                className="text-left text-white/80 hover:text-tan transition-colors text-sm"
                            >
                                Política de Privacidade
                            </button>
                            <button
                                onClick={handleFeatureClick}
                                className="text-left text-white/80 hover:text-tan transition-colors text-sm"
                            >
                                Termos de Uso
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <span className="text-lg font-semibold text-tan">Contato</span>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-4 w-4 text-tan mt-1 flex-shrink-0" />
                                <span className="text-white/80">Av. Paulista, 1234 - São Paulo, SP</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-tan" />
                                <span className="text-white/80">(11) 99999-9999</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-tan" />
                                <span className="text-white/80">contato@natalacessorios.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="font-semibold text-tan">CNPJ:</span>
                                <span className="text-white/80">12.345.678/0001-90</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <span className="text-lg font-semibold text-tan">Newsletter</span>
                        <p className="text-white/80 text-sm">Receba novidades e ofertas exclusivas.</p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                            <input
                                type="email"
                                placeholder="Seu e-mail"
                                className="w-full px-3 py-2 bg-white/10 border border-tan/50 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-tan"
                            />
                            <Button
                                type="submit"
                                className="w-full bg-tan hover:bg-tan-dark text-carmine font-bold"
                            >
                                Inscrever-se
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-tan/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-white/60 text-sm">&copy; {new Date().getFullYear()} Natal Acessórios. Todos os direitos reservados.</p>
                    <SSLBadge />
                </div>
            </div>
        </footer>
    );
};

export default Footer;