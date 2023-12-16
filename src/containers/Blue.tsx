import { useOutletContext } from "react-router-dom";

export default function Blue() {
  const { pageState, setPageState } = useOutletContext<any>();

  return (
    <div>
      Blue Input:
      <input
        className="ml-2"
        type="text"
        defaultValue={pageState.name}
        onChange={(e: any) =>
          setPageState({ ...pageState, name: e.target.value })
        }
      />
    </div>
  );
}
