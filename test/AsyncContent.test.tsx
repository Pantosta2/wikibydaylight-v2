import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AsyncContent } from "@/common/components/AsyncContent";

describe("AsyncContent", () => {
  it("debe mostrar el mensaje de carga cuando isLoading es true", () => {
    render(
      <AsyncContent
        isLoading={true}
        error={null}
        data={[]}
        loadingMessage="Cargando..."
      >
        {() => <div>Contenido de datos</div>}
      </AsyncContent>
    );
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
    expect(screen.queryByText("Contenido de datos")).not.toBeInTheDocument();
  });

  it("debe mostrar el mensaje de error cuando hay un error", async () => {
    const errorMessage = "Fallo al obtener los datos";

    render(
      <AsyncContent
        isLoading={false}
        error={new Error(errorMessage)}
        data={[]}
        errorMessage="Algo salió mal"
      >
        {() => <div>Contenido de datos</div>}
      </AsyncContent>
    );

    const errorTitle = await screen.findByText("Algo salió mal");
    expect(errorTitle).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText("Contenido de datos")).not.toBeInTheDocument();
    expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
  });
  it("debe mostrar el mensaje de vacío cuando los datos son un arreglo vacío", () => {
    render(
      <AsyncContent
        isLoading={false}
        error={null}
        data={[]}
        emptyMessage="No se encontraron elementos."
      >
        {() => <div>Contenido de datos</div>}
      </AsyncContent>
    );

    expect(
      screen.getByText("No se encontraron elementos.")
    ).toBeInTheDocument();

    expect(screen.queryByText("Contenido de datos")).not.toBeInTheDocument();
  });
  it("debe renderizar los componentes hijos cuando hay datos", () => {
    const testData = [{ id: 1, name: "Elemento de prueba" }];

    render(
      <AsyncContent isLoading={false} error={null} data={testData}>
        {(items) => (
          <div>
            <h1>Contenido cargado</h1>
            <ul>
              {items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        )}
      </AsyncContent>
    );

    expect(screen.getByText("Contenido cargado")).toBeInTheDocument();
    expect(screen.getByText("Elemento de prueba")).toBeInTheDocument();
    expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
    expect(
      screen.queryByText("No se encontraron elementos.")
    ).not.toBeInTheDocument();
  });
});
