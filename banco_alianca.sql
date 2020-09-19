
/************************
Cria��o Banco de Dados 
************************/

/************************
Tabela 3 - ATIVIDADES 
************************/
CREATE TABLE IF NOT EXISTS aee.ATIVIDADES ( 
ID_ATIVIDADE INT NOT NULL AUTO_INCREMENT, 
NOME_ATIVIDADE VARCHAR(100),
PRIMARY KEY (ID_ATIVIDADE)); 
/************************
Tabela 3 - ATIVIDADES 
************************/

/************************
Tabela 4 - ATIVIDADES_CENTRO
************************/
CREATE TABLE IF NOT EXISTS aee.ATIVIDADES_CENTRO (
ID_ATIVIDADE_CENTRO INT NOT NULL AUTO_INCREMENT,
ID_CENTRO INT, 
ID_ATIVIDADE INT,
HORINI TIME,
HORFIM TIME, 
DIA_SEMANA VARCHAR(30),
NUMERO_TURMA INT,
PRIMARY KEY (ID_ATIVIDADE_CENTRO));
/************************
Tabela 4 - ATIVIDADES_CENTRO
************************/