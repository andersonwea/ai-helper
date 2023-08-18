# 🚧 AI Helper 🚧 
<img alt="Status Concluído" src="https://img.shields.io/badge/STATUS-CONCLU%C3%8DDO-brightgreen">


## 💻 Sobre o projeto

Este é um projeto que reuni 3 serviços de AI, transcrição de áudio, geração de texto e conversão de texto em fala (Text-to-Speech). 
Essa API foi desenvolvida em Node.js e permite que você envie um arquivo de áudio em formato .wav, e ela retornará a transcrição do áudio em texto.
Além disso, você também pode enviar um texto para a API, e ela irá convertê-lo em um arquivo de áudio com a fala correspondente.
Você também pode enviar texto para API e ela te retornará um texto de acordo com a requisição.

--- 

## 🛠 Tecnologias
 - [Node.js](https://nodejs.org/en)
 - [Express](https://expressjs.com/pt-br/)
 - [Typescript](https://www.typescriptlang.org)

---    

## 🥁 Pré-requisitos

 - [Node.js](https://nodejs.org/en) instalado na sua máquina.

--- 

## ⚙️ Instalação e Execução

Clone este repositório em sua máquina:
```bash
git clone https://github.com/andersonwea/ai-helper.git
cd ai-helper
```

### Instale as dependências:
```bash
npm install
```

### Inicie o servidor da API:
```bash
npm run dev
```
> A API estará disponível em http://localhost:3333.

--- 

## 🔨 Configuração do Arquivo .env

1. Renomeie o arquivo .env.example para .env

2. Abra o arquivo .env em um editor de texto.

3. O arquivo .env contém variáveis de ambiente que são utilizadas para configurar a API.
   As variáveis devem ser preenchidas com valores específicos para que a API funcione corretamente.

4. Procure pelas variáveis que precisam ser configuradas e forneça os valores apropriados.
    Essas váriaveis são:
```env
PORT: Define a porta em que a API será executada. Por padrão: PORT=3333.
NODE_ENV: Define o ambiente de execução. Desenvolvimento: NODE_ENV='DEV'. Produção: NODE_ENV='PROD'
OPENAI_API_KEY: Define a chave para acesso ao openai. 
HF_API_KEY: Define a chave de acesso para o Hugging Face.
ELEVENLABS_API_KEY: Define a chave de acesso para o ElevenLabs.
ELEVENLABS_VOICE_ID: Define o ID da voz a ser utilizada.
```
* Saiba como criar uma API key [Openai.](https://platform.openai.com/docs/api-reference) ($5 FREE para testar)
* Saiba como criar uma API key [HuggingFace.](https://huggingface.co/settings/tokens) (FREE)
* Saiba como criar uma API key [ElevenLabs.](https://docs.elevenlabs.io/api-reference/quick-start/introduction) (30k caracteres para testar)

5. Salve o arquivo .env após preencher as variáveis com os valores corretos.

Certifique-se de que as variáveis de ambiente no arquivo .env estejam configuradas corretamente para que a API funcione sem problemas. 
Em seguida, reinicie o servidor da API após fazer qualquer alteração no arquivo .env. 
Isso permitirá que as configurações sejam aplicadas corretamente à execução da API.

--- 

## 🛣️ Endpoints da API

 - POST /api/transcription: Envie um arquivo de áudio (.wav) para obter sua transcrição em texto.
 - POST /api/text-to-speech: Envie um texto para gerar um link para o arquivo de áudio com a fala correspondente.
 - POST /api/text-generation: Envie um texto para gerar um texto como base no que foi enviado e o custo em centavos.

--- 

## 👯 Exemplos de uso

Exemplo de solicitação para transcrição de áudio usando o cURL:

```bash
curl -X POST -F "file=@caminho/para/o/arquivo.wav" http://localhost:3333/api/transcription > trancription.txt
```

Exemplo de solicitação para geração de áudio a partir de um texto usando o cURL:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"text": "Olá! Este é um exemplo de texto para fala."}' \
  http://localhost:3333/api/text-to-speech > link_audio.txt
```
Exemplo de solicitação para geração de texto usando o cURL:
```bash
curl -X POST -H "Content-Type: application/json" -d '{"text": "Olá! Este é um exemplo de texto para fala."}' \
  http://localhost:3333/api/text-generation > text.txt
```

## 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

## 📝 Licença

<!-- Este projeto esta sobe a licença [MIT](./LICENSE). -->
Essa API é uma ferramenta poderosa para transcrição de áudio e geração de fala a partir de texto. 
Sinta-se à vontade para explorar e integrar em seus próprios projetos.

Se encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue neste repositório. Contribuições são sempre bem-vindas!

Aproveite a API!
