const API_URL = 'https://travel-log-app-hlfeu.run-us-west2.goorm.io'

export async function travelLogEntries(){
	const response = await fetch(`${API_URL}/api/logs`);
	return response.json();
}