Task API
Introdução
Esta API foi criada para fins educacionais. O foco era utilizar todos os métodos e tipos de envio mais usados, como query params, body params, multipart, entre outros, com NodeJS e JavaScript "cru", sem ajuda externa de frameworks como Express e NextJS.

Funcionalidades
Criação de Tarefas: Permite criar novas tarefas enviando dados no body da requisição e por meio de um arquivo csv com o padrão "title, description"

Listagem de Tarefas: Recupera a lista de todas as tarefas criadas, e obtenha tarefas pelo campo "title" e "description" por meio de Query Params

Atualização de Tarefas: Atualiza detalhes de uma tarefa específica enviando seu ID com Request Params e novos dados com o Body Params.

Remoção de Tarefas: Remove tarefas baseadas no ID fornecido com Request Params.

Como Usar
Requisitos
NodeJS instalado.

Instalação
Clone este repositório: git clone https://github.com/seu-usuario/task-api.git

Navegue até o diretório do projeto: cd task-api

Instale as dependências: npm install

Execução
Inicie o servidor: node src/server.js

A API estará disponível em http://localhost:3333

Exemplos de Uso
Criação de Tarefa
bash
curl -X POST http://localhost:3333/tasks -H "Content-Type: application/json" -d '{"title": "Nova Tarefa", "description": "Descrição da tarefa"}'
Listagem de Tarefas
bash
curl -X GET http://localhost:3333/tasks
Atualização de Tarefa
bash
curl -X PUT http://localhost:3333/tasks/1 -H "Content-Type: application/json" -d '{"title": "Tarefa Atualizada", "description": "Descrição atualizada"}'
Remoção de Tarefa
bash
curl -X DELETE http://localhost:3333/tasks/1
Contribuição
Sinta-se à vontade para abrir issues e pull requests. Todas as contribuições são bem-vindas!
