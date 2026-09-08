# *Sistema de Registro de Treinos e Progressos em Academia*

Aplicação web autoral desenvolvida para a disciplina **Técnico Profissional – Informática para Internet** (Senac), com o objetivo de demonstrar a integração completa entre **Banco de Dados (MySQL) → Backend (PHP) → Frontend (HTML + CSS + JS)**.

O sistema permite registrar treinos de academia, controlando exercício, grupo muscular, séries, repetições, carga utilizada e observações — servindo como um diário de evolução física.

## Objetivo

Aplicar na prática os conceitos de modelagem de dados, CRUD com SQL, criação de API REST e consumo via JavaScript (`fetch()`), construindo uma solução funcional e de uso pessoal.

## Tecnologias utilizadas

- **Banco de Dados:** MySQL (via XAMPP)
- **Backend:** PHP com PDO e *prepared statements*
- **Frontend:** HTML5, CSS3 e JavaScript puro (vanilla JS)
- **Comunicação:** API REST consumida via `fetch()`

## Estrutura de pastas

*sistema-treinos/*

backend/
- config.php       
- treinos.php      

frontend/
- index.html      
- style.css       
- app.js          

database/
- schema.sql       

Tabela única treinos, contendo os dados de cada sessão de exercício registrada:

| Campo | Tipo | Descrição |
|---|---|---|
| id | INT (PK, auto increment) | Identificador único do treino |
| exercicio | VARCHAR(100) | Nome do exercício realizado |
| grupo_muscular | VARCHAR(50) | Grupo muscular trabalhado |
| data_treino | DATE | Data em que o treino foi realizado |
| series | INT | Número de séries |
| repeticoes | INT | Número de repetições por série |
| carga_kg | DECIMAL(5,2) | Carga utilizada, em quilos |
| observacoes | VARCHAR(255) | Observações livres sobre o treino |

## Funcionalidades

- ✅ Listagem dos treinos em cards
- ✅ Cadastro de novo treino
- ✅ Edição de treino existente
- ✅ Exclusão de treino
- ✅ Busca por exercício ou grupo muscular em tempo real
- ✅ Layout responsivo (funciona em celular e desktop)

## Rotas da API (`backend/treinos.php`)

| Método | Rota | Ação |
|---|---|---|
| GET | `/treinos.php` | Lista todos os treinos |
| GET | `/treinos.php?busca=texto` | Filtra treinos por exercício ou grupo muscular |
| POST | `/treinos.php` | Cria um novo treino |
| PUT | `/treinos.php?id=1` | Atualiza um treino existente |
| DELETE | `/treinos.php?id=1` | Exclui um treino |

Como executar o projeto (XAMPP)

1. Copie a pasta sistema-treinos para dentro de C:\xampp\htdocs\.
2. Abra o XAMPP Control Panel e inicie os módulos Apache e MySQL.
3. Acesse http://localhost/phpmyadmin, abra a aba SQL e execute o conteúdo de database/schema.sql. Isso cria o banco treinos_academia, a tabela treinos e insere dados de exemplo.
4. No navegador, acesse: http://localhost/sistema-treinos/frontend/index.html

## Autor

Projeto autoral desenvolvido por Arthur Dimer de Oliveira para a disciplina de TI — Senac, 2º Trimestre de 2026.
