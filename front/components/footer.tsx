import * as React from "react"
import Link from 'next/link';

export default function Footer() {
	return (
		<>
			<div className="bg-black text-white py-10 text-base">
				<div className="max-w-screen-lg lg:mx-auto md:mx-auto sm:mx-auto flex flex-col md:flex-row justify-between">
					<div className="flex-row md:items-center mb-5 md:mb-0 mx-auto">
						<p className="font-semibold mb-5 border-b text-center inline-block">Fôpagâcher</p>
						<ul className="space-y-3">
							<li>
								<Link href="/about-page">A propos de nous</Link>
							</li>
							<li>
								<Link href="/contact-page">Nous contacter</Link>
							</li>
						</ul>
					</div>
					<div className="flex-row md:mb-0 mx-auto">
						<p className="font-semibold mb-3 border-b text-center inline-block">Pages</p>
						<ul className="space-y-3">
							<li>
								<Link href="/">Accueil</Link>
							</li>
							<li>
								<Link href="/premium-page">Crée un pont</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>


	)
}
