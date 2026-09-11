CREATE DATABASE IF NOT EXISTS treinos_academia;
USE treinos_academia;

CREATE TABLE treinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercicio VARCHAR(100) NOT NULL,
    grupo_muscular VARCHAR(50) NOT NULL,
    data_treino DATE NOT NULL,
    series INT NOT NULL,
    repeticoes INT NOT NULL,
    carga_kg DECIMAL(5,2) DEFAULT 0,
    observacoes VARCHAR(255)
);

INSERT INTO treinos (exercicio, grupo_muscular, data_treino, series, repeticoes, carga_kg, observacoes) VALUES
('Supino Reto', 'Peito', '2026-08-01', 4, 10, 60.00, 'Boa execução'),
('Agachamento Livre', 'Pernas', '2026-08-01', 3, 12, 80.00, 'Aumentar carga'),
('Rosca Direta', 'Bíceps', '2026-08-02', 3, 15, 20.00, NULL);