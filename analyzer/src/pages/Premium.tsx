import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'

function Premium() {
    return (
        <div className=' min-h-screen flex flex-row items-center justify-center'>
            <Card className='m-8 w-96 h-96 text-black items-center justify-center flex flex-col'>
                <CardHeader>
                    <CardTitle className='text-center'>Free</CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, enim?</h2>
                </CardContent>
                <CardFooter className='text-center'>
                    <Button className='text-center'>Your Plan</Button>
                </CardFooter>
            </Card>
            <Card className='m-8 w-96 h-96 text-black items-center justify-center flex flex-col'>
                <CardHeader>
                    <CardTitle className='text-center'>Premium</CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, odit?
                </CardContent>
                <CardFooter>
                    <Button className=' text-end'>Pay now</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Premium
