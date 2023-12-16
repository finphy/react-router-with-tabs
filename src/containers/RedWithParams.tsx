import { useParams } from "react-router-dom";

export default function RedWithParams() {
  const { id } = useParams();

  return <div>Param ID: {id}</div>;
}
