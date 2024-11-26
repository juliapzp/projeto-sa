CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  cpf VARCHAR(14) NOT NULL,
  senha TEXT NOT NULL
);

CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(255) NOT NULL UNIQUE,
  senha TEXT NOT NULL
);

CREATE TABLE duvida (
  id_duvida SERIAL PRIMARY KEY,
  descricao_duvida VARCHAR(500),
  assunto_duvida VARCHAR(255),
  id_cliente INT NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
);

CREATE TABLE resposta (
  id_resposta SERIAL PRIMARY KEY,
  descricao_resposta VARCHAR(500),
  id_duvida INT NOT NULL,
  id_admin INT NOT NULL,
  FOREIGN KEY (id_duvida) REFERENCES duvida(id_duvida) ON DELETE CASCADE,
  FOREIGN KEY (id_admin) REFERENCES admin(id) ON DELETE CASCADE
);

-- Dados de Exemplo

INSERT INTO admin (id, usuario, senha)
VALUES (1, 'admin123', 'senha123');

INSERT INTO clientes (id, email, cpf, senha)
VALUES (1, 'cliente@example.com', '123.456.789-00', 'cliente123');

INSERT INTO duvida (descricao_duvida, assunto_duvida, id_cliente)
VALUES ('Tenho uma dúvida sobre o produto X', 'Produto X', 1);

INSERT INTO resposta (descricao_resposta, id_duvida, id_admin)
VALUES ('A dúvida foi resolvida. O produto X está disponível.', 1, 1);