import FormOperator from "../../../components/FormOperator";

const fetchOperator = (id) => {
  // Pendiente llamada al back para traer todos los operators
  /* return axios.get(`https://localhost:5000/api/operators/{id}`).then((res) => res.json()) */
  return {
    id,
    name: "Operador 1",
    mail: "operador1@test.com",
    dni: 24732129,
    branch: "Palermo",
    password: "hsfdu3aq1",
  };
};

export default function EditOperatorPage({ params }) {
  const { id } = params;
  const operator = fetchOperator(id);

  return (
    <section className="section bg-grey2">
      <FormOperator operator={operator} newOperator={false} />
    </section>
  );
}
