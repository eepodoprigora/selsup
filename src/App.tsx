import React, { useRef } from "react";

// Типы данных
interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

// Классовый компонент ParamEditor
class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Устанавливаем начальное состояние
    this.state = {
      paramValues: props.model.paramValues,
    };
  }

  // Метод для обработки изменения значений параметров
  handleInputChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: prevState.paramValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      ),
    }));
  };

  getModel(): Model {
    return {
      paramValues: this.state.paramValues,
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues } = this.state;

    return (
      <div>
        {params.map((param) => {
          const paramValue =
            paramValues.find((pv) => pv.paramId === param.id)?.value || "";
          return (
            <div key={param.id} style={{ marginBottom: "10px" }}>
              <label style={{ marginRight: "10px" }}>{param.name}</label>
              <input
                type="text"
                value={paramValue}
                onChange={(e) =>
                  this.handleInputChange(param.id, e.target.value)
                }
              />
            </div>
          );
        })}
      </div>
    );
  }
}

const App: React.FC = () => {
  const editorRef = useRef<ParamEditor>(null);

  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
  };

  const handleSave = () => {
    if (editorRef.current) {
      const updatedModel = editorRef.current.getModel();
      console.log("Updated Model:", updatedModel);
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Редактор параметров</h1>
      <ParamEditor ref={editorRef} params={params} model={model} />
      <button onClick={handleSave} style={{ marginTop: "20px" }}>
        Сохранить
      </button>
    </div>
  );
};

export default App;
