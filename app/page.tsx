async function getData() {
  // Configure the URL to fetch specific patient data
  // Application will throw error if patient doesn't exists in FHIR Server
  const res = await fetch('https://hapi.fhir.org/baseR4/Patient/44707296?_format=json')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="p-24">
      <div className="w-full font-mono">
        <p>
          <b><u>FHIR API based Patient Application</u></b>
        </p>
        <table>
          <tr>
            <td>First Name</td>
            <td>{data.name[0].given}</td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>{data.name[0].family}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{data.birthDate}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{data.gender}</td>
          </tr>
        </table>
        <br />
        <p>Patient Data JSON:  <pre>{JSON.stringify(data, null, 2) }</pre></p>
      </div>
      <div>
     </div>
    </main>
  );
}