document.addEventListener('DOMContentLoaded', () => {
    // =========================================================================
    // PASSO 1: CONFIGURE SUAS CREDENCIAIS DA AZURE AQUI
    // ATENÇÃO: Nunca exponha estas chaves em um site público (produção).
    // =========================================================================
    const subscriptionKey = "";
    const locationOrRegion = ""; // Ex: "brazilsouth"
    const endpoint = "https://api.cognitive.microsofttranslator.com/";

    // =========================================================================
    // Seletores de Elementos do DOM
    // =========================================================================
    const fromLanguageEl = document.getElementById('from-language');
    const toLanguageEl = document.getElementById('to-language');
    const textToTranslateEl = document.getElementById('text-to-translate');
    const translatedTextEl = document.getElementById('translated-text');
    const translateBtn = document.getElementById('translate-btn');
    const statusMessageEl = document.getElementById('status-message');

    // =========================================================================
    // Função para buscar e popular os idiomas
    // =========================================================================
    async function getAndPopulateLanguages() {
        const url = `${endpoint}languages?api-version=3.0&scope=translation`;
        statusMessageEl.textContent = 'Carregando idiomas...';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erro ao buscar idiomas: ${response.statusText}`);
            }
            const data = await response.json();
            const languages = data.translation;

            for (const langCode in languages) {
                const language = languages[langCode];
                const optionFrom = document.createElement('option');
                optionFrom.value = langCode;
                optionFrom.textContent = `${language.name} (${langCode})`;
                fromLanguageEl.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = langCode;
                optionTo.textContent = `${language.name} (${langCode})`;
                toLanguageEl.appendChild(optionTo);
            }
            // Definir um idioma padrão (ex: Português)
            toLanguageEl.value = 'pt';
            statusMessageEl.textContent = '';
        } catch (error) {
            console.error('Falha ao popular idiomas:', error);
            statusMessageEl.textContent = 'Erro ao carregar idiomas. Verifique o console.';
        }
    }

    // =========================================================================
    // Função principal de tradução
    // =========================================================================
    async function translateText() {
        const textToTranslate = textToTranslateEl.value.trim();
        const toLanguage = toLanguageEl.value;
        const fromLanguage = fromLanguageEl.value;

        if (!textToTranslate) {
            statusMessageEl.textContent = 'Por favor, digite um texto para traduzir.';
            return;
        }
        if (!toLanguage) {
            statusMessageEl.textContent = 'Por favor, selecione um idioma de destino.';
            return;
        }
        if (!subscriptionKey || subscriptionKey === "COLE_SUA_CHAVE_DE_ASSINATURA_AQUI") {
             statusMessageEl.textContent = 'Erro: A chave de assinatura da Azure não foi configurada no script.js.';
             return;
        }


        statusMessageEl.textContent = 'Traduzindo...';
        translatedTextEl.value = '';

        let url = `${endpoint}translate?api-version=3.0&to=${toLanguage}`;
        // Adiciona o idioma de origem apenas se não for "Detectar Idioma"
        if (fromLanguage) {
            url += `&from=${fromLanguage}`;
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Ocp-Apim-Subscription-Region': locationOrRegion,
                    'Content-type': 'application/json',
                    'X-ClientTraceId': crypto.randomUUID().toString() // UUID para rastreamento
                },
                body: JSON.stringify([{ 'Text': textToTranslate }])
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Erro da API: ${errorData.error.message}`);
            }

            const data = await response.json();
            const translation = data[0].translations[0].text;
            
            translatedTextEl.value = translation;
            statusMessageEl.textContent = '';

        } catch (error) {
            console.error('Erro na tradução:', error);
            translatedTextEl.value = '';
            statusMessageEl.textContent = `Falha na tradução: ${error.message}`;
        }
    }

    // =========================================================================
    // Event Listeners
    // =========================================================================
    translateBtn.addEventListener('click', translateText);
    
    // Iniciar o carregamento dos idiomas quando a página carregar
    getAndPopulateLanguages();
});