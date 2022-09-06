import './App.css';
import CustomTable from './components/CustomTable';
import Header from './components/Header'

function App() {
	return (
		<div className="App">
			<Header />
			<CustomTable titel="In der Saison" />
			<CustomTable titel="Außerhalb Saison" />
		</div>
	);
}

export default App;
