import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';

const columns = [
	{
		name: 'Lebensmittel',
		selector: row => row.name,
		sortable: true
	},
	{
		name: 'von',
		selector: row => row.anfangsDatum,
	},
	{
		name: 'bis',
		selector: row => row.endDatum,
	},
	{
		name: 'Favorit',
		selector: row => row.favorit ? "⭐" : "☆",
		sortable: true
	}
];

const customStyles = {
	header: {
		style: {
			paddingTop: '60px',
			paddingBottom: '20px',
			paddingLeft: '25%',
			textAlign: 'left',
			fontWeight: 300,
			fontSize: '1.6em',
		},
	},
	table: {
		style: {
			paddingLeft: '28%',
			paddingRight: '28%',
		},
	},
	headRow: {
		style: {
			paddingLeft: '3%',
			fontWeight: 600,
			fontSize: '1.6em'
		},
	},
	rows: {
		style: {
			paddingLeft: '3%',
			fontWeight: 300,
			fontSize: '1em'
		},
	},
};


function CustomTable(props) {

	const [onSeason, setOnSeason] = useState([])
	const [offSeason, setOffSeason] = useState([])

	const fetchAllDataOnSeason = () => {
		fetch("https://seasonchecker.duckdns.org:1444/allOnSeason")
			.then(res => res.json())
			.then((result) => {
				setOnSeason(result);
			})
	}

	const fetchAllDataOffSeason = () => {
		fetch("https://seasonchecker.duckdns.org:1444/allOffSeason")
			.then(res => res.json())
			.then((result) => {
				setOffSeason(result);
			})
	}

	useEffect(() => {
		fetchAllDataOnSeason();
		fetchAllDataOffSeason();
	}, [])

	const [q, setQ] = useState("")

	function search(row) {
		return row.filter(row => row.name.toLowerCase().indexOf(q) > -1)
	}

	return (
		<div>
			<div className='searchDiv'>
				<input type="text" placeholder="Suchen..." value={q} onChange={(e) => setQ(e.target.value)} />
			</div>
			<DataTable
				title={"In der Saison"}
				customStyles={customStyles}
				columns={columns}
				data={search(onSeason)}
			/>
			<DataTable
				title={"Außerhalb der Saison"}
				customStyles={customStyles}
				columns={columns}
				data={search(offSeason)}
			/>
		</div >

	);
}

export default CustomTable;