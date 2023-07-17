import { NextResponse } from 'next/server';

import data from './data.json';
import demodata from './demo-data.json';

export async function GET(request) {
	if (request.url.origin === 'https://taichi2023.taiwanchi.org') {
		return NextResponse.json(data);
	}
	return NextResponse.json(demodata);
}
