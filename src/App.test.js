import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App, { calcularNovoSaldo } from './app';

describe("Componente principal", () => {
    it('Mostar o nome do banco', ()=>{
        render(<App />)

        expect(screen.getByText('ByteBank')).toBeInTheDocument();
    })

    it('Mostrar saldo', ()=>{
        render(<App />)

        expect(screen.getByText('Saldo:')).toBeInTheDocument();
    })

    it('O botão saldo transação é exibido', ()=>{
        render(<App />)


        expect(screen.getByText('Realizar operação')).toBeInTheDocument();
    })
})

describe('Quando eu realizo uma transação', ()=>{
    it('Que é um saque, o valor vai diminuir',() => {
        const valores = {
            transacao: 'saque',
            valor: 50
        }
        const novoSaldo = calcularNovoSaldo(valores, 150)
        expect(novoSaldo).toBe(100);
    })
    it('Que em um saque, a transacao deve ser realizada', () =>
    {
        const { getByText, getByTestId, getByLabelText } = render(<App />)

        const saldo = getByText("R$ 1000");
        const transacao = getByLabelText('Saque');
        const valor = getByTestId('valor');
        const botaoTransacao = getByText('Realizar operação')

        expect(saldo.textContent).toBe('R$ 1000')

        fireEvent.click(transacao, { target: { value: 'saque' }})
        fireEvent.change(valor, { target: { value: 10} })
        fireEvent.click(botaoTransacao)

        expect(saldo.textContent).toBe('R$ 990')

    })
})