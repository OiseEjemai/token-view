import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card"

function CardSection() {
    return (
        <div>
            <h1 className='text-center text-2xl mb-4'>Services</h1>
            <div className='grid grid-cols-3 justify-center items-center'>
                <Card className='m-4 bg-black text-white'>
                    <CardHeader>
                        <CardTitle className='text-center'>Get Information about your favorite token</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Know the details about your favorite cryptocurrency token just by searching for it.
                    </CardContent>
                </Card>
                <Card className='m-4 bg-black text-white'>
                    <CardHeader>
                        <CardTitle className='text-center'>What tokens to invest in?</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Get to know the best tokens to either buy, sell or just hold using analytics from the token.
                    </CardContent>
                </Card>
                <Card className='m-4 bg-black text-white'>
                    <CardHeader>
                        <CardTitle className='text-center'>Get Information about a particular cryptocurrency token</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                    </CardContent>
                </Card>
                <Card className='m-4 bg-black text-white'>
                    <CardHeader>
                        <CardTitle className='text-center flex-wrap items-center'>Get Information about a particular cryptocurrency token</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                    </CardContent>
                </Card>
                <Card className='m-4 bg-black text-white'>
                    <CardHeader>
                        <CardTitle className='text-center'>Get Information about a particular cryptocurrency token</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                    </CardContent>
                </Card>
                <Card className='m-4 bg-black text-white'>
                    <CardHeader>
                        <CardTitle className='text-center'>Get Information about a particular cryptocurrency token</CardTitle>
                    </CardHeader>
                    <CardContent className='text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default CardSection
