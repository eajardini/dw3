----- Cria um banco de dados
-- create database dw3;

create table IF NOT EXISTS cursos (
    cursoid bigserial constraint pk_cursos PRIMARY KEY,
    codigo varchar(50) UNIQUE,
    descricao VARCHAR(60),
    ativo boolean,
    deleted boolean DEFAULT false
);

insert into cursos values 
    (default, 'BSI', 'Bacharelado em Sistemas de Informação', true),
    (default, 'DIREITO', 'Bacharelado em Direito', true),
    (default, 'LETRAS', 'Licenciatura em Letras', true),
    (default, 'ADM', 'Bacharelado em Administração', false)
    ON CONFLICT DO NOTHING;

create table IF NOT EXISTS alunos (
    alunoid bigserial constraint pk_alunos PRIMARY KEY,
    prontuario varchar(10) UNIQUE,
    nome varchar(50),
    endereco VARCHAR(60),
    rendafamiliar numeric(8,2),
    datanascimento date,
    cursoid bigint constraint fk_aluno_curso REFERENCES cursos,
    deleted boolean DEFAULT false
);

insert into alunos values 
    (default, 'pront1', 'José das Neves', 'Rua A, Votuporanga', 6891.60, '2000-01-31', 
        (SELECT cursoid from CURSOS where codigo = 'BSI')),
    (default, 'pront2', 'Maria Silveira', 'Rua B, São José do Rio Preto', 7372.41, '2002-03-12', 
        (SELECT cursoid from CURSOS where codigo = 'DIREITO'))
ON CONFLICT DO NOTHING;

create table IF NOT EXISTS usuarios (
    usuarioid bigserial constraint pk_usuarios PRIMARY KEY,
    username varchar(10) UNIQUE,
    password text,
    deleted boolean DEFAULT false
);

CREATE EXTENSION if NOT EXISTS pgcrypto;

insert into usuarios values 
    (default, 'admin', crypt('admin', gen_salt('bf'))), -- senha criptografada com bcrypt
    (default, 'qwe', crypt('qwe', gen_salt('bf'))) -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;

-- Usado para exercícios

create table IF NOT EXISTS clientes (
    clienteid bigserial constraint pk_clientes PRIMARY KEY,
    codigo varchar(50) UNIQUE,
    nome VARCHAR(60),
    endereco VARCHAR(50),
    ativo boolean,
    deleted boolean DEFAULT false
);

insert into clientes values 
    (default, 'CLI01', 'João da Silva', 'Rua A1', true),
    (default, 'CLI02', 'Marcia Almeida', 'Rua B2', true)
    ON CONFLICT DO NOTHING;

create table IF NOT EXISTS pedidos (
    pedidoid bigserial constraint pk_pedidos PRIMARY KEY,
    numero bigint UNIQUE,
    data DATE,
    valortotal numeric(9,2),
    clienteid bigint constraint fk_pedido_cliente REFERENCES clientes,    
    deleted boolean DEFAULT false
);

insert into pedidos values 
 (default, 234, '2020-01-31', 6891.60, (SELECT clienteid from CLIENTES where codigo = 'CLI01'))
 ON CONFLICT DO NOTHING;

