import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';

function macheDatumSchoen(datum) {
	var stringArray = datum.split("-");
	var temp = stringArray[1];
	stringArray[1] = stringArray[0];
	stringArray[0] = temp;
	return stringArray[0] + "." + stringArray[1];
}

function CustomTable() {

	const [onSeason, setOnSeason] = useState([])
	const [offSeason, setOffSeason] = useState([])

	var columns = [
		{
			name: 'Lebensmittel',
			selector: row => row.name,
			sortable: true
		},
		{
			name: 'von',
			selector: row => macheDatumSchoen(row.anfangsDatum),
		},
		{
			name: 'bis',
			selector: row => macheDatumSchoen(row.endDatum),
		},
		{
			name: 'Favorit',
			selector: row => row.favorit ? "true" : "false",
			cell: (d) => d.favorit ? [
				<svg onClick={handleClick.bind(this, d.favorit, d.id)} key={d.id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
					<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
				</svg>
			] : [
				<svg onClick={handleClick.bind(this, d.favorit, d.id)} key={d.id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
					<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
				</svg>
			],
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


	async function handleClick(isFav, id) {
		await fetch("https://seasonchecker.duckdns.org:1444/updateFavorit/" + id + "/" + !isFav);
		fetchAllDataOnSeason();
		fetchAllDataOffSeason();
	}

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