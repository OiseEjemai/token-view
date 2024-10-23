import React, { useState } from 'react'
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Basic email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }
        if (isSubscribed) {
            setMessage('You are already subscribed!');
            return;
        }

        try {
            // Send email to backend
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subscribe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Successfully subscribed to the newsletter!");
                setIsSubscribed(true);
            } else {
                setMessage(data.message || "Something went wrong, please try again.");
            }
            console.log(data)
        } catch (error) {
            setMessage("Failed to subscribe, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative isolate overflow-hidden bg-neutral-400 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                    <div className="max-w-xl lg:max-w-lg">
                        <h2 className="text-4xl font-semibold tracking-tight text-white">Subscribe to our newsletter</h2>
                        <p className="mt-4 text-lg text-gray-300">
                            Subscribe to be the first to get informed.
                        </p>
                        <div className="mt-6 flex max-w-md gap-x-4">
                            {/* <form onSubmit={handleSubmit} className='flex flex-row items-center'> */}
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                autoComplete="off"
                                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                {loading ? 'Loading...' : 'Subscribe'}

                            </button>
                            {/* </form> */}
                        </div>
                        {message && <p className="mt-4 text-center text-white">{message}</p>}
                    </div>
                    {/* <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <CalendarDaysIcon aria-hidden="true" className="h-6 w-6 text-white" />
                            </div>
                            <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
                            <dd className="mt-2 leading-7 text-gray-400">
                                Weekly articles covering latest news on the cryptocurrency world
                            </dd>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                <HandRaisedIcon aria-hidden="true" className="h-6 w-6 text-white" />
                            </div>
                            <dt className="mt-4 font-semibold text-white">No spam</dt>
                            <dd className="mt-2 leading-7 text-gray-400">
                                We won't spam.
                            </dd>
                        </div>
                    </dl> */}
                </div>
            </div>
        </div>
    )
}


export default Newsletter;