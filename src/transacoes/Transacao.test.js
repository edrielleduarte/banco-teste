import { render } from "@testing-library/react";
import Transacao from "./Transacao";
import React from 'react';

describe("Componente de transacao do extrato",()=>{

    it('O snapshot do componente deve permanecer sempre o mesmo', () => {

        const { container } = render(<Transacao 
        data= "08/09/2020"
        tipo="saque"
        valor="20.00"/>)
        expect(container.firstChild).toMatchSnapshot();
    })
})