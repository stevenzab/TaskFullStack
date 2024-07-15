import Link from 'next/link'
import React, { useState } from 'react';
// import Ai from '../assets/ai.svg';
// import PREMIUM from '../assets/premium.svg'
// import ABOUT from '../assets/about.svg'
// import CONTACT from '../assets/contact.svg'
// import FAQ from '../assets/faq.svg'
// import HOME from '../assets/home.svg'

/**
 * NavBar Component
 *
 * This is a React component named `NavBar` that represents a navigation bar with links to different pages.
 * It uses `next/link` for client-side navigation and `next/image` for optimized image rendering.
 *
 * @component NavBar
 * @returns {JSX.Element} The rendered NavBar component.
 * @example
 *
 * import React from 'react';
 * import NavBar from './NavBar';
 * import LogoImage from '../assets/logo.png';
 *
 * const Example: React.FC = () => {
 *   return (
 *     <NavBar/>
 *   );
 * };
 *
 * export default Example;
 */

export default function NavBar() {
	let [open, setOpen] = useState(false)

	return (
		<>
			<div className="sticky top-0 z-10">
				<div className='md:flex md:flex-row w-full md:items-center md:justify-between p-4' style={{ backgroundColor: '#6CC5A2' }}>
					<div className="md:flex items-center">
						{/* <span className="text-2xl cursor-pointer relative md:left-8">
							<Link href="/">
								<Image
									src={LogoImage}
									alt="logo"
									width={55}
									height={55}
								/>
							</Link>
						</span> */}

						{!open && (
							<button onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-8 h-8 mr-5"
								>
									<path d="M3 12h18M3 6h18M3 18h18" />
								</svg>
							</button>
						)}

						{open && (
							<button
								className="md:text-3xl absolute right-8 top-6 cursor-pointer md:hidden mr-5"
								onClick={() => setOpen(!open)}
							>
								<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
									<g clip-path="url(#clip0_712_7983)">
										<path d="M9 27L27 9M9 9L27 27" stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
									</g>
									<defs>
										<clipPath id="clip0_712_7983">
											<rect width="36" height="36" rx="9" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</button>
						)}
					</div>
					<div className={`md:flex-1 md:flex md:justify-center ${open ? 'block' : 'hidden'} md:block`}>
						<ul className='md:flex md:flex-row font-semibold'>
							<li className="mx-4 my-6 md:my-0">
								<Link href="/" className="md:text-xl hover:text-cyan-500 duration-500 text-white flex iems-center" onClick={() => setOpen(false)}>
									{/* <Image
										src={HOME}
										alt="IA"
										width={30}
										className='mr-2 md:hidden'
									/> */}
									Accueil
								</Link>
							</li>
							<li className="mx-4 my-6 md:my-0">
								<Link href="/bridge" className="md:text-xl sm:text-sm text-md hover:text-cyan-500 duration-500 text-white flex items-center" onClick={() => setOpen(false)}>
									{/* <Image
										src={PREMIUM}
										alt="IA"
										width={30}
										className='mr-2 md:hidden'
									/> */}
									Bridge list
								</Link>
							</li>
							<li className="mx-4 my-6 md:my-0">
								<Link href="/create-bridge" className="md:text-xl text-sm hover:text-cyan-500 duration-500 text-white flex items-center" onClick={() => setOpen(false)}>
									{/* <Image
										src={ABOUT}
										alt="IA"
										width={30}
										className='mr-2 md:hidden'
									/> */}
									Create a Bridge
								</Link>
							</li>
							<li className="mx-4 my-6 md:my-0">
								<Link href="/contact-page" className="md:text-xl text-sm hover:text-cyan-500 duration-500 text-white flex items-center" onClick={() => setOpen(false)}>
									{/* <Image
										src={CONTACT}
										alt="IA"
										width={30}
										className='mr-2 md:hidden'
									/> */}
									Contact
								</Link>
							</li>
							<li className="mx-4 my-6 md:my-0 flex">
								<Link href="/ia-page" className="md:text-xl text-sm hover:text-cyan-500 duration-500 text-white flex items-center" onClick={() => setOpen(false)}>
									{/* <Image
										src={Ai}
										alt="IA"
										width={30}
										className='mr-2 md:hidden'
									/> */}
									IA
								</Link>
							</li>
							<li className="mx-4 my-6 md:my-0">
								<Link href="/faq" className="md:text-xl text-sm hover:text-cyan-500 duration-500 text-white flex items-center" onClick={() => setOpen(false)}>
									{/* <Image
										src={FAQ}
										alt="IA"
										width={30}
										className='mr-2 md:hidden'
									/> */}
									FAQ
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div >
		</>

	)
}
