export function formatarData(data: string): string {
  return new Date(data).toLocaleDateString("pt-BR");
}

export function formatarDataHora(data: string): string {
  return new Date(data).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}
