export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
};

export const formatCep = (cep: string): string => {
    const numbers = cep.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const validateCep = (cep: string): boolean => {
    const cleanCep = cep.replace(/\D/g, '');
    return cleanCep.length === 8;
};

export const calculateInstallments = (price: number, maxInstallments = 12) => {
    const installments = [];
    for (let i = 1; i <= maxInstallments; i++) {
        const installmentValue = price / i;
        if (installmentValue >= 10) { // M�nimo de R$ 10 por parcela
            installments.push({
                number: i,
                value: installmentValue,
                total: price,
                interest: i > 6 ? 0.05 : 0 // Juros ap�s 6x
            });
        }
    }
    return installments;
};