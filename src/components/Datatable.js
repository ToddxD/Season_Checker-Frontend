import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';

const columns = [
    {
        name: 'Lebensmittel',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'beginnt am',
        selector: row => row.anfangsDatum,
        sortable: true,
    },
    {
        name: 'endet am',
        selector: row => row.endDatum,
        sortable: true,
    },
    {
        name: 'favourit',
        selector: row => row.favorit ? "⭐" : "☆",
        sortable: true,
    },
];

function MyComponent() {
    const [eintrage, setEintrage] = useState([])

    const fetchAllData = () => {
        //https://seasonchecker.duckdns.org:1444/demo/all
        fetch("https://seasonchecker.duckdns.org:1444/demo/all")
            .then(res => res.json())
            .then((result) => {
                setEintrage(result);
            })
    }

    useEffect(() => {
        fetchAllData()
    }, [])

    const [q, setQ] = useState("")

    function search(row) {
        return row.filter(row => row.name.toLowerCase().indexOf(q) > -1)
    }

    return (
        <div>
            <div>
                <input type="text" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div>
                <DataTable
                    columns={columns}
                    data={search(eintrage)}
                />
            </div>
        </div>
    );
};
export default MyComponent;