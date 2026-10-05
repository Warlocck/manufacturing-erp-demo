/**
 * Header - Encabezado de sección principal
 * Design: Industrial Minimalist
 * - Título y descripción claros
 * - Espaciado generoso
 * - Tipografía jerárquica
 */

interface HeaderProps {
  title: string;
  description?: string;
}

export default function Header({ title, description }: HeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
