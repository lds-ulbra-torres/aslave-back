# Padrão de nomenclatura (english only!)

## Nomes de arquivos
* utiliza notação camelCase
* nome do arquivo deve ser igual ao nome do Model, Controller e conter letra maiuscula no começo.
* nome do model sempre deve ser NomeModel. Ex. UserModel. (singular)
* nome do controller sempre deve ser NomeController. Ex. UsersController (plural)

* Nunca usar acentos.

* Evitar espaços, mesmo que o contexto permita
* Evite abreviar a não ser em casos já conhecidos. ex. CPF, UF.
* Preposições devem normalmente ser omitidas.
* Comentar código quando necessário!

## Variáveis
* Nome da variável deve dizer claramente o que a variável é e faz
* Variáveis do tipo boolean devem receber nomes que impliquem verdadeiro ou falso acabou, ok, feito, sucesso
* Não utilizar nomes temporários ou nomes que não guardam significado temp1, temp2, var1, var2, xx4.
* Nunca declarar uma variável com var
* Tentar usar mais const do let

## Classes e objetos
* Nome de objeto, singular. Listas, plural. Ex: Objeto obj, List<Objeto> objs.
* Nome de classes, letra inicial maiúscula e nomeclatura CamelCase.

## Funções
* Nome do método não deve conter o nome da classe na qual ele se aplica
* Receber paremetro da rota pelo metodo do controller ex: function buscaCep(param) {}
* Reutilizar o maximo de funções possiveis
* Dividir arquivos por modulos do sistema

## Outros
Comentar códigos. Formato: data, autor e comentario
Estilo de comentário: 
 * @author Joziel - 10-10-2018 - Validação de Cep
 * @param cpf - O cpf que será validado
 * @return - se o cpf é válido ou não

## Controller
<code>
index(){ }

store(){ }

update(){ }

delete(){ }

</code>
