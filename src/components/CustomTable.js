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
		selector: row => row.isFavorit,
		sortable: true
	}
];

const data = [
	{
		name: 'Apfel',
		anfangsDatum: '12.10',
		endDatum: '12.12',
		isFavorit: 'false'
	},
	{
		name: 'Birne',
		anfangsDatum: '12.10',
		endDatum: '12.12',
		isFavorit: 'true'
	}
]

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
				title={props.titel}
				customStyles={customStyles}
				columns={columns}
				data={search(data)}
			/>
		</div >

	);
}

export default CustomTable;