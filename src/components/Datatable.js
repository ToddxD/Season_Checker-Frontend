import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';

const columns = [
    {
        name: 'id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Title',
        selector: row => row.name,
        sortable: true,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]


function MyComponent() {
    const[eintrage, setEintrage]=useState([])

    const fetchAllData=()=> {
    //https://seasonchecker.duckdns.org:1444/demo/all
    fetch("http://localhost:8080/demo/all")
    .then(res=>res.json())
    .then((result)=>{
        setEintrage(result);
    })
  }

    useEffect(()=> {
        fetchAllData()
          }, [])
    

    return (
        <DataTable
            columns={columns}
            data={eintrage}
        />
    );
};
export default MyComponent;