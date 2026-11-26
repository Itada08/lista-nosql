# Lista de Exercícios — NoSQL vs SQL

## 1. Identificar o banco
Abrindo a resposta da API no DevTools (aba Network → Response), o identificador é `_id`
(24 caracteres em hexadecimal). Isso indica **MongoDB**: o Mongo cria o `_id` (ObjectId)
automaticamente em cada documento. Em bancos SQL o normal é um `id` numérico
incremental (1, 2, 3...).

## 2. Documento café
```json
{ "_id": "abc123", "produto": "Café", "preco": 12.5, "tags": ["quente", "manhã"],
  "fornecedor": { "nome": "CoopeCafé", "cidade": "Dourados" } }
```
- **(a) `_id`:** `"abc123"` — identificador único do documento.
- **(b) Subdocumentos:** `fornecedor` — objeto dentro do documento, com `nome` e `cidade`.
- **(c) Arrays:** `tags` — lista com `"quente"` e `"manhã"`.

## 3. Definições
- **Coleção:** conjunto de documentos no MongoDB. É parecida com uma tabela do SQL
  (ex.: coleção `contatos`), mas guarda documentos em vez de linhas.
- **Schemaless:** o banco não obriga uma estrutura fixa. Documentos da mesma coleção
  podem ter campos diferentes. A validação fica por conta da aplicação (ex.: Zod).

## 4. Vantagens
**SQL**
1. Relacionamentos e integridade (chaves estrangeiras e JOIN).
2. Transações ACID confiáveis.
3. Estrutura definida: todos os registros seguem as mesmas colunas e tipos.

**MongoDB**
1. Flexibilidade: sem schema fixo, é fácil mudar os campos.
2. Dados relacionados ficam juntos no mesmo documento (subdocumentos e arrays).
3. Escala horizontal (sharding) e formato parecido com JSON, que combina com JavaScript.

## 5. URL de acesso
`http://localhost:3000/api/v1/contatos`

(porta 3000 do Express; caminho `/api/v1/contatos` da listagem)

## 6. Componente consumidor
Em `src/ListaContatos.jsx`: faz `fetch` na URL acima, trata carregando/erro/vazio,
cancela com `AbortController` e renderiza a lista com `key={item._id ?? item.id}`.

## 7. Detetive de API
Um `_id` de 24 caracteres hexadecimais é o formato do **ObjectId do MongoDB**
(12 bytes escritos em hexa). Além disso, campos que variam de um item para outro
indicam um banco sem schema fixo. Em SQL, todas as linhas teriam as mesmas colunas e
o `id` costuma ser um número. Por isso o backend provavelmente usa MongoDB.
