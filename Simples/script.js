// Este evento garante que nosso código só vai rodar depois que
// toda a página HTML for carregada. É uma boa prática.
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // PASSO 1: CONFIGURAÇÃO OBRIGATÓRIA
    // Aqui você deve colocar as informações do seu recurso de Tradutor da Azure.
    // Lembre-se: em um projeto real, NUNCA deixe essas chaves no código do frontend.
    // =========================================================================
    // PASSO 1: CONFIGURAÇÃO OBRIGATÓRIA - AGORA MUITO MAIS SIMPLES!
    const backendApiUrl = 'http://127.0.0.1:5000/api/translate';


    // =========================================================================
    // PASSO 2: PEGAR OS ELEMENTOS DO HTML
    // Criamos variáveis para acessar os elementos HTML com os quais vamos interagir.
    // É como dar um "apelido" para cada elemento, para usá-los no código.
    // =========================================================================
    const textToTranslateEl = document.getElementById('text-to-translate');
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const translateBtn = document.getElementById('translate-btn');
    const translatedTextEl = document.getElementById('translated-text');
    const statusMessageEl = document.getElementById('status-message');


    // =========================================================================
    // PASSO 3: A FUNÇÃO QUE FAZ A MÁGICA ACONTECER
    // Esta função será chamada quando o usuário clicar no botão "Traduzir Agora".
    // A palavra 'async' indica que a função fará operações que podem demorar (como chamar uma API).
    // =========================================================================
    async function translateText() {
        // Pega o texto do <textarea> e o idioma selecionado no <select>.
        const textToTranslate = textToTranslateEl.value;
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value; // Pode estar vazio (detecção automática)

        // Verificação simples para garantir que o usuário digitou algo.
        if (!textToTranslate) {
            alert("Por favor, digite um texto para traduzir.");
            return; // Para a execução da função aqui.
        }

        // Informa ao usuário que a tradução está em andamento.
        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = ''; // Limpa o campo de resultado anterior.

        // O bloco try...catch é usado para lidar com possíveis erros.
        // O código dentro de 'try' é executado. Se algo der errado, o 'catch' é acionado.
        try {
            // A função 'fetch' é a forma moderna do JavaScript de fazer requisições de rede (chamar APIs).
            // A palavra 'await' pausa a execução da função até que a API responda.

            const response = await fetch(backendApiUrl, { // <-- Usa a URL do nosso backend
                method: 'POST',
                headers: {
                    // <-- Cabeçalhos de autenticação REMOVIDOS
                    'Content-type': 'application/json'
                },
                // <-- O corpo agora usa o formato que NOSSA API espera
                body: JSON.stringify({
                    'text': textToTranslate,
                    'to': toLanguage,
                    'from': fromLanguage
                })
            });

            const data = await response.json();

            // Verificamos o status da resposta diretamente
            if (!response.ok) {
                throw new Error(data.error || 'Ocorreu um erro no servidor.');
            }

            // Acessamos a tradução de forma muito mais direta
            const translation = data.translation;

            // Colocamos o texto traduzido no <textarea> de resultado.
            translatedTextEl.value = translation;
            statusMessageEl.textContent = 'Tradução concluída!'; // Sucesso!

        } catch (error) {
            // Se qualquer coisa no bloco 'try' falhar, o código aqui será executado.
            console.error("Ocorreu um erro:", error); // Mostra o erro detalhado no console do navegador.
            statusMessageEl.textContent = `Erro na tradução: ${error.message}`; // Mostra uma mensagem de erro para o usuário.
        }
    }


    // =========================================================================
    // PASSO 4: ADICIONAR UM "OUVINTE DE EVENTO" AO BOTÃO
    // Aqui, dizemos ao JavaScript: "quando o elemento 'translateBtn' for clicado,
    // execute a função 'translateText'".
    // =========================================================================
    translateBtn.addEventListener('click', translateText);
});