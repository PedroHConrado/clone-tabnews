import useSWR from "swr";

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <h2>Database</h2>
      <DatabaseStatus />
    </>
  );
}

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  console.log(data);
  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleDateString("pt-BR");
  }
  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatus = "Carregando...";

  if (!isLoading && data) {
    databaseStatus = data.dependencies.database;
  }

  return (
    <>
      <p>Versão: {databaseStatus.version}</p>
      <p>Conexões abertas: {databaseStatus.opened_connections}</p>
      <p>Conexões máximas: {databaseStatus.max_connections}</p>
    </>
  );
}
