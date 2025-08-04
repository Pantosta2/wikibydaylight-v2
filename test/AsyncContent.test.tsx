import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AsyncContent } from "@/common/components/AsyncContent";

describe("AsyncContent", () => {
  it("shows loading message", () => {
    render(
      <AsyncContent
        isLoading={true}
        error={null}
        data={null}
        loadingMessage="Cargando..."
        errorMessage=""
        emptyMessage=""
      >
        {() => <div>Contenido</div>}
      </AsyncContent>
    );
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("shows error message with string error", () => {
    render(
      <AsyncContent
        isLoading={false}
        error="Algo salió mal"
        data={null}
        errorMessage="Ocurrió un error"
        emptyMessage=""
      >
        {() => <div>Contenido</div>}
      </AsyncContent>
    );
    expect(screen.getByText("Ocurrió un error")).toBeInTheDocument();
    expect(screen.getByText("Algo salió mal")).toBeInTheDocument();
  });

  it("shows error message with Error object", () => {
    render(
      <AsyncContent
        isLoading={false}
        error={new Error("Error inesperado")}
        data={null}
        errorMessage="Ocurrió un error"
        emptyMessage=""
      >
        {() => <div>Contenido</div>}
      </AsyncContent>
    );
    expect(screen.getByText("Error inesperado")).toBeInTheDocument();
  });

  it("shows empty message when data is null", () => {
    render(
      <AsyncContent
        isLoading={false}
        error={null}
        data={null}
        emptyMessage="Sin datos"
        errorMessage=""
      >
        {() => <div>Contenido</div>}
      </AsyncContent>
    );
    expect(screen.getByText("Sin datos")).toBeInTheDocument();
  });

  it("shows empty message when data is empty array", () => {
    render(
      <AsyncContent
        isLoading={false}
        error={null}
        data={[]}
        emptyMessage="No hay resultados"
        errorMessage=""
      >
        {() => <div>Contenido</div>}
      </AsyncContent>
    );
    expect(screen.getByText("No hay resultados")).toBeInTheDocument();
  });

  it("renders children when data exists", () => {
    render(
      <AsyncContent
        isLoading={false}
        error={null}
        data={[{ id: 1 }]}
        emptyMessage=""
        errorMessage=""
      >
        {(data) => <div>Datos recibidos: {data.length}</div>}
      </AsyncContent>
    );
    expect(screen.getByText("Datos recibidos: 1")).toBeInTheDocument();
  });
});
