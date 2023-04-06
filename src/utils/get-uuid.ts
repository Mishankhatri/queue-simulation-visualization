export default function getUuid(): string {
  return Math.random().toString(36).slice(2);
}
