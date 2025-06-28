# 🌍 Projeto Tradutor com Azure AI

Um tradutor de textos simples e funcional construído com Python (Flask) para o backend e HTML/CSS/JS para o frontend, utilizando os Serviços Cognitivos de IA da Azure.

---

### ⚙️ Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **Backend:**    * ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
    * ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
* **Frontend:**    * ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
    * ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
    * ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
* **Cloud & Deploy:**    * ![Azure](https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white) (App Service para o Backend)

---

### ✨ Funcionalidades

* Tradução de texto em tempo real.
* Detecção automática do idioma de origem.
* Interface limpa e de fácil utilização.
* Backend seguro que protege as chaves da API.

---

### 🚀 Como Executar o Projeto

Siga os passos abaixo para executar o projeto em sua máquina local.

1.  **Clone o repositório:**    ```bash
    git clone [https://github.com/SEU_USUARIO/projeto-tradutor-azure.git](https://github.com/SEU_USUARIO/projeto-tradutor-azure.git)
    cd projeto-tradutor-azure
    ```

2.  **Configure o Backend:**    * Navegue até a pasta do backend: `cd backend`
    * Crie e ative um ambiente virtual:
        ```bash
        python -m venv venv
        # No Windows: .\venv\Scripts\activate
        # No macOS/Linux: source venv/bin/activate
        ```
    * Instale as dependências: `pip install -r requirements.txt`
    * Crie um arquivo `.env` e adicione suas chaves da Azure:
        ```env
        AZURE_SUBSCRIPTION_KEY="SUA_CHAVE_AQUI"
        AZURE_LOCATION="sua_regiao_aqui"
        ```
    * Inicie o servidor backend: `python app.py`

3.  **Execute o Frontend:**    * Abra o arquivo `frontend/index.html` diretamente no seu navegador.

---

### 👨‍💻 Autor

Feito com ❤️ por [Vinicio Santos](https://github.com/Viniart).