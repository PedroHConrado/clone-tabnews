import email from 'infra/email.js';
import orchestrator from 'tests/orchestrator.js';

describe('infra/email.js', () => {
    beforeAll(async () => {
        await orchestrator.waitForAllServices();
        await orchestrator.deleteAllEmails();
    });
    
    it('should have a send function', async () => {
        await email.send({
            from: "FinTab <contato@fintab.com.br>",
            to: "contato@curso.dev",
            subject: "Teste de assunto",
            text: "Teste de corpo."
        });
        await email.send({
            from: "FinTab <contato@fintab.com.br>",
            to: "contato@curso.dev",
            subject: "último email enviado",
            text: "Corpo do último email."
        });

        const lastEmail = await orchestrator.getLastEmail();
        expect(lastEmail.sender).toBe("<contato@fintab.com.br>");
        expect(lastEmail.recipients[0]).toBe("<contato@curso.dev>");
        expect(lastEmail.subject).toBe("último email enviado");
        expect(lastEmail.text).toBe("Corpo do último email.\r\n");
    });
});