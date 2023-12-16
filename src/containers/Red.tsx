import { useOutletContext, useSearchParams } from "react-router-dom";

export default function Red() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { pageState, setPageState } = useOutletContext<any>();

  if (id)
    return (
      <>
        <div>Query ID: {id}</div>
        <div className="mt-2">
          Red WithQuery Input:
          <input
            className="ml-2"
            type="text"
            defaultValue={pageState.name}
            onChange={(e: any) =>
              setPageState({ ...pageState, name: e.target.value })
            }
          />
        </div>
      </>
    );
  return (
    <div>
      Red Input:
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
