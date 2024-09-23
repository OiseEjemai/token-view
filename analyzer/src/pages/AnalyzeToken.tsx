import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "sonner";
import Topbar from '../components/shared/Topbar';
import { Input } from '../components/ui/input';
import Loader from '../components/shared/Loader';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SkeletonCard from '../components/shared/SkeletonCard';
import { Button } from '../components/ui/button';
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";

const AnalyzeToken = () => {
    const [search, setSearch] = useState('');
    const { data: authUser } = useQuery({ queryKey: ["authUser"] });
    const [tokenInfo, setTokenInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setError] = useState('');
    const [recommendation, setRecommendation] = useState('Hold');
    const [estimatedReturn, setEstimatedReturn] = useState({});

    const queryClient = useQueryClient();

    const {
        mutate: searchMutation,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async (search) => {
            try {
                const res = await fetch("https://token-view.onrender.com/save-searches", {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ search }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            // refetch the authUser
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            // toast("Successfully Logged in!")
        },
    });

    const fetchTokenInfo = async (searchQuery) => {
        setLoading(true);
        setError('');
        setTokenInfo(null);

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${searchQuery.toLowerCase()}`, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ search }),
            });
            // const response = await axios.get(`/api/coins/${searchQuery.toLowerCase()}`);
            setTokenInfo(response.data);
            analyzeToken(response.data); // Call the analysis function
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
        if (searchQuery.toLowerCase() === 'ton' || searchQuery.toLowerCase() === 'toncoin') {
            try {
                // const fallbackResponse = await axios.get(`/api/coins/the-open-network`);
                const fallbackResponse = await fetch(`https://api.coingecko.com/api/v3/coins/the-open-network`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ search }),
                });
                setTokenInfo(fallbackResponse.data);
                analyzeToken(fallbackResponse.data); // Call the analysis function
                setLoading(false);
            } catch (fallbackError) {
                setError('Token not found or server error');
                setLoading(false);
            }
        }
    };

    const analyzeToken = (data) => {
        const currentPrice = data.market_data.current_price.usd;
        const ath = data.market_data.ath.usd;
        const atl = data.market_data.atl.usd;

        const priceChange7d = data.market_data.price_change_percentage_7d_in_currency?.usd || 0;
        const priceChange14d = data.market_data.price_change_percentage_14d_in_currency?.usd || 0;
        const priceChange30d = data.market_data.price_change_percentage_30d_in_currency?.usd || 0;
        const priceChange60d = data.market_data.price_change_percentage_60d_in_currency?.usd || 0;
        const priceChange200d = data.market_data.price_change_percentage_200d_in_currency?.usd || 0;

        let action = 'Hold';  // Default action
        let estimatedReturns = {};

        // Determine recommendation based on price range
        if (currentPrice <= atl * 1.2) {
            action = 'Buy';
        } else if (currentPrice >= ath * 0.8) {
            action = 'Sell';
        }

        // Calculate estimated returns based on price changes
        estimatedReturns = {
            "7-day": ((currentPrice * (1 + priceChange7d / 100)) - currentPrice).toFixed(2),
            "14-day": ((currentPrice * (1 + priceChange14d / 100)) - currentPrice).toFixed(2),
            "30-day": priceChange30d !== 0 ? ((currentPrice * (1 + priceChange30d / 100)) - currentPrice).toFixed(2) : 'N/A',
            "60-day": priceChange60d !== 0 ? ((currentPrice * (1 + priceChange60d / 100)) - currentPrice).toFixed(2) : 'N/A',
            "200-day": priceChange200d !== 0 ? ((currentPrice * (1 + priceChange200d / 100)) - currentPrice).toFixed(2) : 'N/A',
        };

        setRecommendation(action);
        setEstimatedReturn(estimatedReturns);
    };



    const handleSearch = (e) => {
        e.preventDefault();
        if (authUser) {
            if (search) {
                fetchTokenInfo(search);
                searchMutation(search)
            }
        } else {
            toast("You must be signed in!");
        }
    };

    return (
        <div>
            <Topbar />
            <div className="app-container bg-black text-white min-h-screen flex flex-col items-start font-mono">
                <div className='flex flex-col md:flex-row w-full p-8'>
                    <div className='md:w-1/2 flex justify-center'>
                        <Card className='w-full max-w-md'>
                            <CardHeader>
                                <CardTitle>Get Information about a particular cryptocurrency token</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSearch} className="flex flex-col gap-6">
                                    <Input
                                        type="text"
                                        className="h-12 bg-dark-4 border-none text-white focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                                        placeholder="Enter token ID (e.g., bitcoin)"
                                        onChange={(e) => setSearch(e.target.value)}
                                        value={search}
                                        required
                                        autoComplete='off'
                                    />
                                    <Button type="submit" className='flex gap-2'>Search</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    <div className='md:w-1/2 ml-8'>
                        {tokenInfo && (
                            <ul className='list-disc list-inside m-8 flex-col'>
                                <li className='mb-3'> {tokenInfo.name} was created in: {tokenInfo.genesis_date}</li>
                                <li className='mb-3'>{tokenInfo.name} has a current price of: ${tokenInfo.market_data.current_price.usd.toLocaleString()}</li>
                                <li className='mb-3'>It has a market Cap of: ${tokenInfo.market_data.market_cap.usd.toLocaleString()}</li>
                                <li className='mb-3'>The 24h Volume is: ${tokenInfo.market_data.total_volume.usd.toLocaleString()}</li>
                                <li className='mb-3'>The all-time high is: ${tokenInfo.market_data.ath.usd.toLocaleString()}</li>
                                <li className='mb-3'>The all-time low is: ${tokenInfo.market_data.atl.usd.toLocaleString()}</li>
                                <li className='mb-3'>The Market cap rank is: {tokenInfo.market_cap_rank}</li>
                                <li className='mb-3'>Price change in 24h is: ${tokenInfo.market_data.price_change_24h.toLocaleString()}</li>
                                <li className='mb-3'>
                                    Total Supply / Max supply: {tokenInfo.market_data.total_supply !== null ? tokenInfo.market_data.total_supply.toLocaleString() : 'N/A'}
                                </li>
                                <li className='mb-3'>The highest high in 24h is: ${tokenInfo.market_data.high_24h.usd.toLocaleString()}</li>
                                <li className='mb-3'>The lowest low in 24h is: ${tokenInfo.market_data.low_24h.usd.toLocaleString()}</li>
                                <li className='mb-3'>The circulating Supply is: {tokenInfo.market_data.circulating_supply.toLocaleString()}</li>
                                <li className='mb-3'>The last time it was updated is: {new Date(tokenInfo.last_updated).toLocaleString()}</li>
                                <li className='mb-3'>
                                    The top 3 exhanges {tokenInfo.name} is traded on are:
                                    {tokenInfo.tickers.slice(1, 4).map(tick => (
                                        <div key={tick.market}><a href={tick.trade_url} className='text-blue-600'>{tick.market.name}</a></div>
                                    ))}
                                </li>
                                <div className="token-analysis mt-8">
                                    <h3>Analysis Result: </h3>
                                    <p>
                                        Action: <strong>{recommendation}</strong>
                                    </p>
                                    <p>Estimated returns:</p>
                                    <ul>
                                        <li>7 days: ${estimatedReturn['7-day']}</li>
                                        <li>14 days: ${estimatedReturn['14-day']}</li>
                                        <li>30 days: ${estimatedReturn['30-day']}</li>
                                        <li>60 days: ${estimatedReturn['60-day']}</li>
                                        <li>200 days: ${estimatedReturn['200-day']}</li>
                                    </ul>
                                </div>
                            </ul>
                        )}
                    </div>
                </div>

                {loading && <Loader />}

                {err && <p className='mt-4 ml-4'>{err}</p>}

                {tokenInfo && (
                    <div className="token-info min-h-screen items-center justify-center flex flex-col m-4">
                        <h2>{tokenInfo.name} ({tokenInfo.symbol.toUpperCase()})</h2>
                        <p className='mt-4 description-container' dangerouslySetInnerHTML={{ __html: tokenInfo.description.en }} />
                    </div>
                )}

                {!tokenInfo && !loading && err && <p className='ml-4'>No results found.</p>}
            </div>
        </div>
    );
};

export default AnalyzeToken;
