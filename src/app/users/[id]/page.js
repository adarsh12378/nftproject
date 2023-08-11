'use client'
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import styless from '../../page.module.css';

export default function NftPage({ params }) {
    const [collectionData, setCollectionData] = useState({});

    useEffect(() => {
        async function fetchData() {
            console.log('fetching data');
            try {
                const res = await Axios.get(`https://api.rarible.org/v0.1/collections/${params.id}`);
                setCollectionData(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, );

    return (
        <div>
            <div className={styless.bg}></div>
            <div className={styless.container}>
                <h2 className={styless.name}>Name: {collectionData.name}</h2>
                <div className={styless.owner}>
                    <p>Owner: {collectionData.owner}</p>
                </div>
                <div className={styless.owner}>
                    <p>Blockchain: {collectionData.blockchain}</p>
                </div>
                <div className={styless.owner}>
                    <p>Symbol: {collectionData.symbol}</p>
                </div>
                <div className={styless.owner}>
                    <p>Status: {collectionData.status}</p>
                </div>
                <div className={styless.description}>
                    <p>The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.</p>
                </div>
               

            </div>
        
        </div>
    );
}

