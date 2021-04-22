import MaterialTable from "material-table";

function EmployeeDrivers(props) {
  let { drivers } = props;

  return (
    <MaterialTable
      columns={[
        { title: "Company Name", field: "company_name" },
        { title: "Employee ID", field: "employee_id" },
        { title: "Home Contract", field: "external_contract_code" },
        { title: "Hire Date", field: "hire_date" },
        { title: "License Class", field: "license_class" },
        { title: "License State", field: "license_state" },
        { title: "Role", field: "role" },
      ]}
      data={drivers}
      title={`Active Drivers`}
      options={{ pageSize: 10 }}
    />
  );
}

export default EmployeeDrivers;
