import React from 'react';

const SSLBadge = () => {
    return (
        <div className="flex items-center justify-center space-x-4 py-4">
            {/* Badge SSL Profissional */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="relative">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-800">Conexão Segura</div>
                        <div className="text-xs text-gray-600">Certificado SSL Verificado</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SSLBadge;