export const metadata = {
	title: 'Submission | TAICHI 2023',
	description: 'TAICHI Submission Page',
	keywords: '',
};

async function fetchSubmissionContent() {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
		next: {
			revalidate: 60,
		},
	});

	await new Promise(resolve => setTimeout(resolve, 1000));

	const content = await response.json();
	return content;
}

const SubmissionPage = async () => {
	const content = await fetchSubmissionContent();

	return (
		<div className="container p-8">
			<h1 className="text-3xl">Submission</h1>
			<ul>
				{content.map(({ title }) => (
					<li key={title}>
						<h3 className="text-2xl">{title}</h3>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SubmissionPage;
