<?php
require_once __DIR__ . '/config.php';

$metodo = $_SERVER['REQUEST_METHOD'];

switch ($metodo) {

    case 'GET':
        $busca = $_GET['busca'] ?? '';
        $sql = "SELECT * FROM treinos";
        if ($busca !== '') {
            $sql .= " WHERE exercicio LIKE :busca OR grupo_muscular LIKE :busca";
        }
        $sql .= " ORDER BY data_treino DESC, id DESC";

        $stmt = $pdo->prepare($sql);
        $busca !== '' ? $stmt->execute([':busca' => "%$busca%"]) : $stmt->execute();
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $d = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("INSERT INTO treinos (exercicio, grupo_muscular, data_treino, series, repeticoes, carga_kg, observacoes)
            VALUES (:exercicio, :grupo, :data, :series, :reps, :carga, :obs)");
        $stmt->execute([
            ':exercicio' => $d['exercicio'],
            ':grupo'     => $d['grupo_muscular'],
            ':data'      => $d['data_treino'],
            ':series'    => $d['series'],
            ':reps'      => $d['repeticoes'],
            ':carga'     => $d['carga_kg'] ?? 0,
            ':obs'       => $d['observacoes'] ?? null,
        ]);
        echo json_encode(["mensagem" => "Treino criado.", "id" => $pdo->lastInsertId()]);
        break;

    case 'PUT':
        $id = $_GET['id'] ?? null;
        $d = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE treinos SET exercicio=:exercicio, grupo_muscular=:grupo,
            data_treino=:data, series=:series, repeticoes=:reps, carga_kg=:carga, observacoes=:obs WHERE id=:id");
        $stmt->execute([
            ':exercicio' => $d['exercicio'],
            ':grupo'     => $d['grupo_muscular'],
            ':data'      => $d['data_treino'],
            ':series'    => $d['series'],
            ':reps'      => $d['repeticoes'],
            ':carga'     => $d['carga_kg'] ?? 0,
            ':obs'       => $d['observacoes'] ?? null,
            ':id'        => $id,
        ]);
        echo json_encode(["mensagem" => "Treino atualizado."]);
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        $stmt = $pdo->prepare("DELETE FROM treinos WHERE id = :id");
        $stmt->execute([':id' => $id]);
        echo json_encode(["mensagem" => "Treino excluído."]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["erro" => "Método não permitido."]);
}