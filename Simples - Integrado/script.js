// Este evento garante que nosso código só vai rodar depois que
// toda a página HTML for carregada. É uma boa prática.
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // PASSO 1: CONFIGURAÇÃO OBRIGATÓRIA - AGORA MUITO MAIS SIMPLES!
    // As chaves secretas foram REMOVIDAS daqui e movidas para o backend.
    // Agora, apenas apontamos para a nossa própria API Flask.
    // =========================================================================
    const backendApiUrl = '<link_do_backend_na_azure>';


    // =========================================================================
    // PASSO 2: PEGAR OS ELEMENTOS DO HTML (Nenhuma alteração aqui)
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
        // Pega o texto do <textarea> e o idioma selecionado no <select>. (Nenhuma alteração aqui)
        const textToTranslate = textToTranslateEl.value;
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value; // Pode estar vazio (detecção automática)

        // Verificação simples para garantir que o usuário digitou algo. (Nenhuma alteração aqui)
        if (!textToTranslate) {
            alert("Por favor, digite um texto para traduzir.");
            return; // Para a execução da função aqui.
        }

        // Informa ao usuário que a tradução está em andamento. (Nenhuma alteração aqui)
        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = ''; // Limpa o campo de resultado anterior.
        
        // O bloco try...catch é usado para lidar com possíveis erros.
        // O código dentro de 'try' é executado. Se algo der errado, o 'catch' é acionado.
        try {
            // A função 'fetch' agora chama a NOSSA API no backend.
            const response = await fetch(backendApiUrl, {
                method: 'POST',
                headers: {
                    // Os cabeçalhos de autenticação foram REMOVIDOS.
                    // O único cabeçalho necessário é para dizer que estamos enviando JSON.
                    'Content-type': 'application/json'
                },
                // O 'body' agora envia os dados no formato que o nosso backend Flask espera.
                body: JSON.stringify({
                    'text': textToTranslate,
                    'to': toLanguage,
                    'from': fromLanguage
                })
            });

            // Convertemos a resposta do NOSSO backend para um objeto JavaScript.
            const data = await response.json();

            // Se a resposta do nosso backend indicar um erro (status não-ok), nós o mostramos.
            if (!response.ok) {
                // 'data.error' é a mensagem de erro que definimos na nossa API Flask.
                throw new Error(data.error || 'Ocorreu um erro no servidor.');
            }

            // Extraímos o texto traduzido da resposta do nosso backend.
            // A estrutura agora é 'data.translation', conforme definimos no Flask.
            const translation = data.translation;
            
            // Colocamos o texto traduzido no <textarea> de resultado.
            translatedTextEl.value = translation;
            statusMessageEl.textContent = 'Tradução concluída!'; // Sucesso!

        } catch (error) {
            // Se qualquer coisa no bloco 'try' falhar, o código aqui será executado. (Nenhuma alteração aqui)
            console.error("Ocorreu um erro:", error); // Mostra o erro detalhado no console do navegador.
            statusMessageEl.textContent = `Erro na tradução: ${error.message}`; // Mostra uma mensagem de erro para o usuário.
        }
    }


    // =========================================================================
    // PASSO 4: ADICIONAR UM "OUVINTE DE EVENTO" AO BOTÃO (Nenhuma alteração aqui)
    // Aqui, dizemos ao JavaScript: "quando o elemento 'translateBtn' for clicado,
    // execute a função 'translateText'".
    // =========================================================================
    translateBtn.addEventListener('click', translateText);
});